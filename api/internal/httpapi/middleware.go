package httpapi

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"log/slog"
	"net/http"
	"runtime/debug"
	"time"
)

// Middleware wraps a handler with extra behavior (logging, recovery, …).
type Middleware func(http.Handler) http.Handler

// chain applies middlewares so the FIRST one listed is the OUTERMOST (runs first on the way in).
func chain(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

type contextKey string

const requestIDKey contextKey = "request_id"

// withRequestID gives every request a random ID: sent back in X-Request-ID and added to logs,
// so one user's bug report can be matched to one log line.
func withRequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		bytes := make([]byte, 8)
		_, _ = rand.Read(bytes) // crypto/rand never fails on supported platforms
		id := hex.EncodeToString(bytes)

		w.Header().Set("X-Request-ID", id)
		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), requestIDKey, id)))
	})
}

func requestID(r *http.Request) string {
	id, _ := r.Context().Value(requestIDKey).(string)
	return id
}

// statusRecorder remembers the status code a handler wrote, for the access log.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (rec *statusRecorder) WriteHeader(status int) {
	rec.status = status
	rec.ResponseWriter.WriteHeader(status)
}

// withAccessLog logs one line per request. Never the body: journal entries are private health data.
func withAccessLog(logger *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			recorder := &statusRecorder{ResponseWriter: w, status: http.StatusOK}

			next.ServeHTTP(recorder, r)

			logger.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", recorder.status,
				"duration_ms", time.Since(start).Milliseconds(),
				"request_id", requestID(r),
			)
		})
	}
}

// withRecover turns a panic in a handler into a 500 JSON response instead of a dropped connection,
// and logs the stack trace so we can fix it.
func withRecover(logger *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if recovered := recover(); recovered != nil {
					logger.Error("panic in handler",
						"panic", recovered,
						"request_id", requestID(r),
						"stack", string(debug.Stack()),
					)
					writeError(w, http.StatusInternalServerError, "internal", "Įvyko klaida. Bandyk dar kartą.")
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

// maxBodyBytes: a journal entry is a few KB; 1 MB leaves plenty of room and stops abuse.
const maxBodyBytes = 1 << 20

func withBodyLimit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)
		next.ServeHTTP(w, r)
	})
}
