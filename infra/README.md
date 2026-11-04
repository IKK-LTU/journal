# Infra — production API

```
internet ──443──▶ Caddy (HTTPS, Let's Encrypt) ──▶ Go API ──▶ Postgres (internal only)
                                                                  ▲
                                               backup: daily pg_dump, 14 days kept
```

- **Server:** AWS EC2, Stockholm, Amazon Linux 2023, 2 vCPU / 913 MB RAM (+1 GB swap) / 8 GB disk.
- **Address:** `https://api.51-20-125-7.sslip.io` (sslip.io turns the IP into a hostname; swap for a real domain later by changing `API_DOMAIN` in `deploy-api.yml`).
- **Frontend** is not here — it's on Cloudflare Workers.
- On the server everything lives in `~/journal-infra/` (`.env` there holds the DB password; it never leaves the server).

## Deploy
Merge to `main` with changes in `api/` or `infra/` → `deploy-api` workflow: build image → push to `ghcr.io/ikk-ltu/journal-api:<sha>` → copy these files → `deploy.sh` on the server → HTTPS health check.

## Rollback
GitHub → Actions → **deploy-api** → *Run workflow* → `image_tag` = the commit SHA of the last good deploy.
Migrations only ever add (never drop/rename), so an older API version still works with the newer schema.

## Look at the server (SSH)
```bash
cd ~/journal-infra
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f api      # JSON, one line per request, no bodies
ls -lh ~/backups/postgres                                    # daily dumps
```

## Restore a backup
```bash
gunzip -c ~/backups/postgres/journal-YYYY-MM-DD.sql.gz \
  | docker-compose -f docker-compose.prod.yml exec -T postgres psql -U journal -d journal
```

## The old stack (retired on the first deploy)
nginx + PHP + MySQL from `~/api` were stopped (not deleted) and their auto-restart disabled. Their containers couldn't run `docker exec` (stale after a Docker runtime upgrade), so MySQL was backed up cold: its data folder archived to `~/backups/mysql-data-before-journal-api-<date>.tar.gz` while stopped.
- Bring the old stack back: stop this stack, then `docker start api-mysql-1 api-php-1 api-nginx-1`.
- Restore the archive elsewhere: extract into an empty folder and mount it as `/var/lib/mysql` of a `mysql:8.0` container.

## Open follow-ups
- Off-server backups (S3, EU region) — today's dumps are on the same disk as the database.
- AWS security group: inbound 80 and 443 must be open (443 for HTTPS, 80 for certificate renewal).
