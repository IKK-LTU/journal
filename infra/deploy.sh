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
# Back up MySQL first, then STOP (not delete) the containers and disable their auto-restart,
# otherwise a reboot would start them again. Undo: docker start api-mysql-1 api-php-1 api-nginx-1
retire_old_stack() {
  local marker="$HOME/.old-stack-retired"
  [ -f "$marker" ] && return
  if ! docker ps -a --format '{{.Names}}' | grep -q '^api-mysql-1$'; then
    touch "$marker"
    return
  fi

  mkdir -p "$HOME/backups"
  if docker ps --format '{{.Names}}' | grep -q '^api-mysql-1$'; then
    local dump
    dump="$HOME/backups/mysql-before-journal-api-$(date +%F).sql"
    echo "→ backing up old MySQL to $dump"
    docker exec api-mysql-1 sh -c '
      if [ -n "$MYSQL_ROOT_PASSWORD" ]; then
        exec mysqldump --all-databases --single-transaction -uroot -p"$MYSQL_ROOT_PASSWORD"
      else
        exec mysqldump --all-databases --single-transaction -uroot
      fi' > "$dump"
    chmod 600 "$dump"
    # Stop here (set -e) rather than retire the old stack without a usable backup.
    [ -s "$dump" ] || { echo "MySQL backup is empty, not stopping the old stack"; exit 1; }
  fi

  echo "→ stopping old stack (kept, not deleted)"
  for container in api-nginx-1 api-php-1 api-mysql-1; do
    docker update --restart=no "$container" >/dev/null 2>&1 || true
    docker stop "$container" >/dev/null 2>&1 || true
  done
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
