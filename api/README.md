# Journal API (Go)

Standard library HTTP router, Postgres via `pgx`, migrations via `goose` (embedded, run on start).

```
cmd/api/main.go          startup: config → db → migrations → server → graceful shutdown
internal/config          env vars, validated at startup
internal/db              connection pool + migrations/*.sql
internal/httpapi         routes, handlers, middleware, JSON helpers
```

## Run (in the Codespace)

```bash
cd api
make dev        # http://localhost:8080/api/healthz → {"status":"ok"}
make test       # unit tests
make test-db    # + integration tests against the dev Postgres
make lint
```

## Environment

| Variable | Default | |
|---|---|---|
| `DATABASE_URL` | — (required) | Postgres connection string |
| `PORT` | `8080` | |
| `APP_ENV` | `development` | `development` or `production` |

## Conventions

- Errors are always `{ "error": { "code": "...", "message": "..." } }` — `code` for the frontend, `message` (LT) for people.
- Never log request/response bodies: journal entries are private health data.
- New migration: `api/internal/db/migrations/0000N_name.sql` with `-- +goose Up` / `-- +goose Down`. Additive only (deploys run them automatically).
