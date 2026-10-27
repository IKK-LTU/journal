// Package config reads settings from environment variables, once, at startup.
// Missing or invalid settings stop the app immediately with a clear error,
// instead of failing later in some request.
package config

import (
	"errors"
	"fmt"
	"os"
)

type Config struct {
	// Port the HTTP server listens on. Default 8080.
	Port string
	// DatabaseURL is the Postgres connection string. Required.
	DatabaseURL string
	// Env is "development" or "production".
	Env string
}

func (c Config) IsProduction() bool {
	return c.Env == "production"
}

// Load reads the config from the environment. getenv is a parameter so tests can pass a fake.
func Load(getenv func(string) string) (Config, error) {
	cfg := Config{
		Port:        valueOr(getenv("PORT"), "8080"),
		DatabaseURL: getenv("DATABASE_URL"),
		Env:         valueOr(getenv("APP_ENV"), "development"),
	}

	var problems []error
	if cfg.DatabaseURL == "" {
		problems = append(problems, errors.New("DATABASE_URL is required"))
	}
	if cfg.Env != "development" && cfg.Env != "production" {
		problems = append(problems, fmt.Errorf("APP_ENV must be development or production, got %q", cfg.Env))
	}

	return cfg, errors.Join(problems...)
}

// FromEnvironment is Load with the real process environment.
func FromEnvironment() (Config, error) {
	return Load(os.Getenv)
}

func valueOr(value, fallback string) string {
	if value == "" {
		return fallback
	}
	return value
}
