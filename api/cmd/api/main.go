// Command api is the Journal backend. Startup order:
// config → database → migrations → HTTP server, then graceful shutdown on SIGTERM/Ctrl+C.
package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/IKK-LTU/journal/api/internal/config"
	"github.com/IKK-LTU/journal/api/internal/db"
	"github.com/IKK-LTU/journal/api/internal/httpapi"
)

func main() {
	// JSON logs: one object per line, easy to search on the server.
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	if err := run(logger); err != nil {
		logger.Error("api stopped", "error", err)
		os.Exit(1)
	}
}

func run(logger *slog.Logger) error {
	cfg, err := config.FromEnvironment()
	if err != nil {
		return fmt.Errorf("config: %w", err)
	}

	// ctx is cancelled on SIGTERM (docker stop / deploy) or Ctrl+C.
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		return err
	}
	defer pool.Close()

	if err := db.Migrate(ctx, pool, logger); err != nil {
		return err
	}

	server := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: httpapi.NewRouter(logger, pool),
		// Timeouts protect against slow or stuck clients holding connections forever.
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	serverErrors := make(chan error, 1)
	go func() {
		logger.Info("api listening", "port", cfg.Port, "env", cfg.Env)
		serverErrors <- server.ListenAndServe()
	}()

	select {
	case err := <-serverErrors:
		return fmt.Errorf("server: %w", err)
	case <-ctx.Done():
		logger.Info("shutting down")
	}

	// Let in-flight requests finish (up to 10s) before exiting.
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := server.Shutdown(shutdownCtx); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return fmt.Errorf("shutdown: %w", err)
	}
	return nil
}
