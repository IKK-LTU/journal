package httpapi

import (
	"context"
	"log/slog"
	"net/http"
	"time"
)

type healthResponse struct {
	Status string `json:"status"`
}

// handleHealth reports whether the API can serve requests, i.e. the database answers.
// Used by the deploy (is the new version up?) and later by uptime monitoring.
func handleHealth(logger *slog.Logger, database Pinger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()

		if err := database.Ping(ctx); err != nil {
			logger.Error("health check: database unreachable", "error", err, "request_id", requestID(r))
			writeJSON(w, http.StatusServiceUnavailable, healthResponse{Status: "unavailable"})
			return
		}
		writeJSON(w, http.StatusOK, healthResponse{Status: "ok"})
	}
}
