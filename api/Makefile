# Run from api/. In the Codespace DATABASE_URL already points at the dev Postgres.
.PHONY: dev test test-db lint build tidy

dev: ## run the API on :8080 (migrations run on start)
	go run ./cmd/api

test: ## unit tests (no database needed)
	go test ./...

test-db: ## unit + integration tests against the dev Postgres
	TEST_DATABASE_URL="$(DATABASE_URL)" go test -race ./...

lint:
	golangci-lint run

build:
	go build -o bin/api ./cmd/api

tidy: ## update go.mod / go.sum after adding or removing imports
	go mod tidy
