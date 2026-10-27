#!/usr/bin/env bash
# Runs once when the Codespace is created. Versions are pinned so every rebuild is identical.
set -euo pipefail

echo "→ Installing Go tools"
go install github.com/sqlc-dev/sqlc/cmd/sqlc@v1.29.0
go install github.com/pressly/goose/v3/cmd/goose@v3.24.3
# Latest: golangci-lint must be built with a Go at least as new as go.mod's (see api-ci.yml).
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/HEAD/install.sh \
  | sh -s -- -b "$(go env GOPATH)/bin"

echo "→ Installing web dependencies"
pnpm --dir web install --frozen-lockfile

echo "✓ Dev box ready"
