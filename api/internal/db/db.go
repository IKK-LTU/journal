// Package db owns the Postgres connection pool and the schema migrations.
package db

import (
	"context"
	"embed"
	"fmt"
	"io/fs"
	"log/slog"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

// Migration files are compiled into the binary, so the Docker image needs no extra files
// and the schema always matches the code that is running.
//
//go:embed migrations/*.sql
var migrationFiles embed.FS

// Connect opens a connection pool and checks the database is reachable right away.
func Connect(ctx context.Context, databaseURL string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, databaseURL)
	if err != nil {
		return nil, fmt.Errorf("create pool: %w", err)
	}

	pingCtx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	if err := pool.Ping(pingCtx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("reach database: %w", err)
	}
	return pool, nil
}

// Migrate applies all migrations that haven't run yet. Safe to call on every startup:
// goose records applied versions in its goose_db_version table.
func Migrate(ctx context.Context, pool *pgxpool.Pool, logger *slog.Logger) error {
	migrations, err := fs.Sub(migrationFiles, "migrations")
	if err != nil {
		return fmt.Errorf("open migrations: %w", err)
	}

	// goose works with database/sql; this wraps our pgx pool without opening new connections.
	// Closing it does NOT close the pool (pgx docs), and nothing useful can be done if it fails.
	sqlDB := stdlib.OpenDBFromPool(pool)
	defer func() { _ = sqlDB.Close() }()

	provider, err := goose.NewProvider(goose.DialectPostgres, sqlDB, migrations)
	if err != nil {
		return fmt.Errorf("create migration provider: %w", err)
	}

	results, err := provider.Up(ctx)
	if err != nil {
		return fmt.Errorf("apply migrations: %w", err)
	}
	for _, result := range results {
		logger.Info("migration applied", "version", result.Source.Version, "duration_ms", result.Duration.Milliseconds())
	}
	return nil
}
