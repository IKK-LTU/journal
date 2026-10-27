# Roadmap

Goal: one product on **web, iPhone and Android**, one Go backend, data synced across devices.

| Phase | What | Status |
|---|---|---|
| 0 | Monorepo, Codespaces | ✅ |
| 1 | FE cleanup, SPA, CI | ✅ |
| — | Design, 7-step flow, insights | ✅ |
| 2 | Go API skeleton | ✅ |
| 3 | First production deploy of the API | next |
| 4 | Auth — **web + mobile** | |
| 5 | Check-ins API — **sync-ready** | |
| 6 | Installable web app (PWA) | |
| 7 | Mobile app (Expo) | |

---

## 3 — Production deploy
API on EC2: Docker Compose (Caddy for HTTPS + api + Postgres), nightly `pg_dump` → S3 (EU), deploy on merge to `main`, rollback = redeploy previous image.
Frontend stays on Cloudflare Workers → API on its own origin (`api.<domain>`), so CORS allows only the web origin.

## 4 — Auth (designed for web **and** mobile from day one)

One `sessions` table, two ways to carry the session:

| Client | How the session travels | Lifetime |
|---|---|---|
| Web | `session` cookie: HttpOnly, Secure, SameSite=Lax | 30 days, sliding |
| Mobile | `Authorization: Bearer <token>`, token kept in Keychain / Keystore (expo-secure-store) | 90 days, sliding |

- `POST /api/auth/login` with `{ email, password, client: "web" | "mobile" }`. Web → cookie only; mobile → token in the response body (never sent to web).
- Auth middleware accepts either; CSRF protection only applies to the cookie path.
- DB stores only a SHA-256 hash of each token. Columns: `token_hash, user_id, client, created_at, last_seen_at, expires_at`.
- `POST /api/auth/logout` (this device), `POST /api/auth/logout-all` (lost phone).
- **`DELETE /api/me`** — delete account and all data, password re-confirmed. **Required by Apple** for apps with accounts, and by GDPR. Available in the app's Settings, not only by e-mail.
- **`GET /api/me/export`** — all entries as JSON (GDPR data portability).
- Login rate limit (per IP + e-mail), generic "invalid e-mail or password".
- Password reset by e-mail: after launch (needs an e-mail provider).

## 5 — Check-ins API (sync-ready, so mobile can work offline)

- **Client creates the id** (UUID) and saves with `PUT /api/checkins/{id}`. Retrying the same request is safe (idempotent) — an offline phone can resend its queue without creating duplicates.
- `updated_at` on every row; `GET /api/checkins?updated_since=<timestamp>` returns only what changed → cheap sync for the app.
- **Soft delete** (`deleted_at`): a delete on the phone reaches the web and vice versa. Purge after 30 days.
- Last write wins per entry (entries are personal and rarely edited on two devices at once).
- Tables: `checkins` (+ `place`, `people text[]`, `reactions text[]`), `checkin_emotions` with `phase` = `before` / `after`.
- Every query scoped by `user_id` from the session, never from input. Isolation test: user B can't read user A.
- Web: replace localStorage with the API; one-time import of existing local entries after first login.

## 6 — Installable web app (PWA)
Manifest + icons + service worker: add to home screen, full screen, offline shell. ~1 day.
Purpose: measure whether people return daily **before** investing in native apps.

## 7 — Mobile app (Expo / React Native)

```
journal/
  web/            React + MUI
  mobile/         Expo (React Native) — screens rebuilt, same design tokens
  packages/core/  shared TS: emotions wheel, insights, validation, dates, plurals, API types
  api/            Go
```

- Move `web/src/constants/emotions.ts`, `utils/{insights,date,plural,streak}.ts`, entry validation into `packages/core` first (they're already pure functions with tests).
- v1 scope: login, 7-step flow, feed, entry detail, insights, settings. Offline queue (Phase 5 makes it safe).
- Phone-only features: **Face ID / fingerprint lock** (expo-local-authentication), **daily reminder** notifications, later a home-screen widget.
- Builds in the cloud with EAS Build (no Xcode needed); test on a real phone with Expo Go.
- Store prerequisites: Apple Developer ($99/year), Google Play ($25 once), **privacy policy URL**, App Privacy / Data Safety forms (health-related data, no tracking), in-app account deletion (Phase 4).
