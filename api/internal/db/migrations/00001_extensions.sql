-- First migration: proves the migration pipeline end to end.
-- citext = case-insensitive text, used for e-mail addresses when users arrive (auth phase).

-- +goose Up
CREATE EXTENSION IF NOT EXISTS citext;

-- +goose Down
DROP EXTENSION IF EXISTS citext;
