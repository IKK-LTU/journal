# CLAUDE.md

Monorepo for Journal — a CBT-style mind journal.

## Layout

```
web/     React + TypeScript + Vite frontend (see web/CLAUDE.md)
api/     Go backend: net/http, pgx, goose (see api/README.md)
infra/   production stack on EC2: Caddy + API + Postgres + backups (see infra/README.md)
```

Implementation plan: phases 0–5 (repo → FE cleanup → API skeleton → prod deploy → auth → check-ins).

## Dev environment

GitHub Codespaces only (`.devcontainer/`). Docker runs in Codespaces, GitHub Actions and EC2, never on the laptop.
Dev Postgres = `db` service in `.devcontainer/docker-compose.yml`. Never point dev tooling at the prod DB.

## Conventions

- Package manager for `web/`: **pnpm only**. Run commands from `web/` or with `pnpm --dir web <cmd>`.
- One PR per phase / feature. CI must be green before merge.
- API contract lives in `api/openapi.yaml`; FE types are generated from it, never hand-written.
- Every DB query that touches user data is scoped by the `user_id` from the session — never from request input.
- Journal entries are sensitive (mental-health) data: no entry content in logs, ever.
