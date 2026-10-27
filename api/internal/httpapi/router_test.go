package httpapi

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
)

type fakeDB struct{ err error }

func (f fakeDB) Ping(context.Context) error { return f.err }

var quietLogger = slog.New(slog.NewTextHandler(io.Discard, nil))

func serve(t *testing.T, handler http.Handler, method, path string) *httptest.ResponseRecorder {
	t.Helper()
	recorder := httptest.NewRecorder()
	handler.ServeHTTP(recorder, httptest.NewRequest(method, path, nil))
	return recorder
}

func decode[T any](t *testing.T, recorder *httptest.ResponseRecorder) T {
	t.Helper()
	var body T
	if err := json.NewDecoder(recorder.Body).Decode(&body); err != nil {
		t.Fatalf("response is not JSON: %v", err)
	}
	return body
}

func TestHealthOK(t *testing.T) {
	response := serve(t, NewRouter(quietLogger, fakeDB{}), http.MethodGet, "/api/healthz")

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", response.Code)
	}
	if got := decode[healthResponse](t, response).Status; got != "ok" {
		t.Errorf("status field = %q, want ok", got)
	}
	if response.Header().Get("X-Request-ID") == "" {
		t.Error("X-Request-ID header missing")
	}
}

func TestHealthDatabaseDown(t *testing.T) {
	response := serve(t, NewRouter(quietLogger, fakeDB{err: errors.New("connection refused")}), http.MethodGet, "/api/healthz")

	if response.Code != http.StatusServiceUnavailable {
		t.Fatalf("status = %d, want 503", response.Code)
	}
}

func TestUnknownRouteIsJSON404(t *testing.T) {
	response := serve(t, NewRouter(quietLogger, fakeDB{}), http.MethodGet, "/api/nope")

	if response.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want 404", response.Code)
	}
	if got := decode[errorBody](t, response).Error.Code; got != "not_found" {
		t.Errorf("error code = %q, want not_found", got)
	}
}

func TestPanicBecomesJSON500(t *testing.T) {
	panicking := http.HandlerFunc(func(http.ResponseWriter, *http.Request) { panic("boom") })
	handler := chain(panicking, withRequestID, withRecover(quietLogger))

	response := serve(t, handler, http.MethodGet, "/")

	if response.Code != http.StatusInternalServerError {
		t.Fatalf("status = %d, want 500", response.Code)
	}
	if got := decode[errorBody](t, response).Error.Code; got != "internal" {
		t.Errorf("error code = %q, want internal", got)
	}
}
