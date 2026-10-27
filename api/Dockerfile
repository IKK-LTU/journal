# Stage 1: compile. The Go toolchain lives only here and is thrown away.
FROM golang:1.25-bookworm AS build
WORKDIR /src

# Dependencies first: this layer is cached until go.mod/go.sum change.
COPY go.mod go.sum ./
RUN go mod download

COPY . .
# CGO off → a fully static binary that runs on a minimal image.
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

# Stage 2: run. distroless = no shell, no package manager, just our binary (~20 MB total).
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=build /out/api /api
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/api"]
