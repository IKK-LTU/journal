// Package httpapi is the HTTP layer: routes, handlers and middleware.
// It uses only the standard library router (Go 1.22+ supports "GET /path" patterns).
package httpapi

import (
	"context"
	"log/slog"
	"net/http"
)

// Pinger is the one thing the health check needs from the database. An interface keeps the
// handler testable without a real Postgres.
type Pinger interface {
	Ping(ctx context.Context) error
}

// NewRouter wires every route and the middleware stack.
func NewRouter(logger *slog.Logger, database Pinger) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/healthz", handleHealth(logger, database))

	// Anything else: JSON 404, so the frontend always gets the same error shape.
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		writeError(w, http.StatusNotFound, "not_found", "Tokio adreso nėra.")
	})

	return chain(mux,
		withRequestID,
		withAccessLog(logger),
		withRecover(logger),
		withBodyLimit,
	)
}
