# Journal

A CBT thought journal: record difficult moments and good ones, then look back at the history.

| Folder | What | Docs |
|---|---|---|
| `web/` | React + TypeScript + Vite frontend | [web/CLAUDE.md](web/CLAUDE.md) |
| `api/` | Go backend (coming soon) | — |
| `infra/` | Local + production Docker setup (coming soon) | — |

## Development (GitHub Codespaces)

Nothing to install locally. Docker, Go, Node/pnpm and Postgres run in the cloud.

1. On GitHub: **Code → Codespaces → Create codespace on main**
   (or `gh codespace create -R IKK-LTU/journal`)
2. Wait for `✓ Dev box ready` in the creation log (first build ≈ 5 min).
3. In the Codespace terminal:

```bash
pnpm --dir web dev     # frontend → forwarded port 5173
```

Dev Postgres runs as the `db` service; `DATABASE_URL` is already set in the terminal.
Stop the Codespace when you're done. The free tier is 60 h/month.
