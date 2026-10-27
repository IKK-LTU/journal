package db

import (
	"context"
	"io"
	"log/slog"
	"os"
	"testing"
)

// Integration test against a real Postgres. Runs in CI (service container) and in the Codespace;
// skipped when TEST_DATABASE_URL isn't set.
func TestConnectAndMigrate(t *testing.T) {
	databaseURL := os.Getenv("TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("TEST_DATABASE_URL not set")
	}
	ctx := context.Background()
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))

	pool, err := Connect(ctx, databaseURL)
	if err != nil {
		t.Fatalf("Connect: %v", err)
	}
	defer pool.Close()

	// Running twice must be a no-op the second time (it runs on every app start).
	for run := 1; run <= 2; run++ {
		if err := Migrate(ctx, pool, logger); err != nil {
			t.Fatalf("Migrate run %d: %v", run, err)
		}
	}

	var hasCitext bool
	err = pool.QueryRow(ctx, "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'citext')").Scan(&hasCitext)
	if err != nil || !hasCitext {
		t.Fatalf("citext extension missing (err: %v)", err)
	}
}
