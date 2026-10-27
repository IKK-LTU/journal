package httpapi

import (
	"encoding/json"
	"net/http"
)

// errorBody is the one error shape every endpoint returns:
//
//	{ "error": { "code": "not_found", "message": "…" } }
//
// `code` is stable for the frontend to switch on; `message` is for humans.
type errorBody struct {
	Error errorDetail `json:"error"`
}

type errorDetail struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	// The status is already sent; if encoding fails the client sees a truncated body. Nothing else to do.
	_ = json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, errorBody{Error: errorDetail{Code: code, Message: message}})
}
