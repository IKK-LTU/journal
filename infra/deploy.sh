#!/usr/bin/env bash
# Runs ON the EC2 server, called by .github/workflows/deploy-api.yml.
# Idempotent: every step checks first, so running it on every deploy is safe.
#
# Needs (from the workflow): IMAGE_TAG, API_DOMAIN, GHCR_USER, GHCR_TOKEN
set -euo pipefail

: "${IMAGE_TAG:?missing}" "${API_DOMAIN:?missing}" "${GHCR_USER:?missing}" "${GHCR_TOKEN:?missing}"
cd "$(dirname "$0")"

COMPOSE="docker-compose -f docker-compose.prod.yml"

# 913 MB RAM is tight for Postgres + Go + Caddy. A swap file absorbs short spikes instead of crashing.
ensure_swap() {
  if swapon --show | grep -q .; then return; fi
  echo "→ adding 1 GB swap"
  sudo fallocate -l 1G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile >/dev/null
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
}

# .env holds the DB password (generated once, stays on the server) + this deploy's values.
ensure_env() {
  umask 077
  if [ ! -f .env ]; then
    echo "→ generating database password"
    echo "POSTGRES_PASSWORD=$(openssl rand -hex 24)" > .env
  fi
  grep -v -E '^(IMAGE_TAG|API_DOMAIN)=' .env > .env.next || true
  { echo "IMAGE_TAG=$IMAGE_TAG"; echo "API_DOMAIN=$API_DOMAIN"; } >> .env.next
  mv .env.next .env
}

# One time only: the old nginx + PHP + MySQL stack (~/api) holds port 80.
# Its containers can't run `docker exec` (stale after a Docker runtime upgrade), so no mysqldump.
# Instead: STOP the containers (not delete), then archive MySQL's data folder while MySQL is stopped
# — a consistent cold backup. Auto-restart is disabled so a reboot doesn't bring them back.
# Undo: docker start api-mysql-1 api-php-1 api-nginx-1
retire_old_stack() {
  local marker="$HOME/.old-stack-retired"
  [ -f "$marker" ] && return
  if ! docker ps -a --format '{{.Names}}' | grep -q '^api-mysql-1$'; then
    touch "$marker"
    return
  fi

  local mysql_data
  mysql_data=$(docker inspect -f '{{range .Mounts}}{{if eq .Destination "/var/lib/mysql"}}{{.Source}}{{end}}{{end}}' api-mysql-1)
  [ -n "$mysql_data" ] || { echo "Can't find the MySQL data folder, not touching the old stack"; exit 1; }

  echo "→ stopping old stack (kept, not deleted)"
  for container in api-nginx-1 api-php-1 api-mysql-1; do
    docker update --restart=no "$container" >/dev/null
    docker stop "$container" >/dev/null
  done
  if [ "$(docker inspect -f '{{.State.Running}}' api-mysql-1)" != "false" ]; then
    echo "MySQL is still running, not copying its files"; exit 1
  fi

  mkdir -p "$HOME/backups"
  local archive
  archive="$HOME/backups/mysql-data-before-journal-api-$(date +%F).tar.gz"
  echo "→ archiving MySQL data ($(sudo du -sh "$mysql_data" | cut -f1)) to $archive"
  sudo tar -czf "$archive" -C "$mysql_data" .
  sudo chown "$(id -u):$(id -g)" "$archive"
  chmod 600 "$archive"
  [ -s "$archive" ] || { echo "Archive is empty"; exit 1; }
  echo "  archive size: $(du -h "$archive" | cut -f1)"

  # The failed mysqldump attempt left a tiny error file behind.
  find "$HOME/backups" -maxdepth 1 -name 'mysql-before-journal-api-*.sql' -size -1k -delete

  touch "$marker"
}

ensure_swap
ensure_env
retire_old_stack
mkdir -p "$HOME/backups/postgres"

echo "→ deploying image tag $IMAGE_TAG"
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin >/dev/null
$COMPOSE pull --quiet
$COMPOSE up -d --remove-orphans
docker logout ghcr.io >/dev/null

# Old images pile up on an 8 GB disk; keep only what's in use.
docker image prune -f >/dev/null

$COMPOSE ps
