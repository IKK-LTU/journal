# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Vite dev server at http://localhost:5173 (/api proxied to :8080)
pnpm build        # Type-check + build static SPA into dist/
pnpm typecheck    # tsc -b only
pnpm lint         # ESLint (flat config)
pnpm test         # Jest
```

Run a single test file:
```bash
pnpm test src/App.test.tsx
```

**Package manager: pnpm only.**

## Architecture

This is a **React 18 + TypeScript + Vite single-page app** — a CBT-style mind journal ("check-in" logging). No SSR: the app is behind a login, so there's nothing for search engines. In prod, Caddy serves `dist/` and forwards `/api/*` to the Go API (same origin).

Entry point: `src/main.tsx`.

### Dates
Always use `toLocalDateString` / `getTodayDateString` from `src/utils/date.ts` for `YYYY-MM-DD` dates. Never `toISOString().slice(0, 10)` — that's UTC and shifts late-night entries to the previous day.

### Path alias
`@/` maps to `src/`. Use it for all internal imports.

### Routing
React Router DOM. All routes defined in `src/router/routes.ts` as a `ROUTES` constant (labels are in Lithuanian). The router is configured in `src/router/index.tsx`.

### State management
Redux Toolkit with two slices:
- `store/features/checkins.ts` — check-in entries; **persisted to `localStorage`** and rehydrated at store init
- `store/features/user.ts` — current user

RTK Query (`usersApi`) fetches user data from `http://localhost:8080`.

Use typed hooks from `src/store/hooks.ts` (`useAppDispatch`, `useAppSelector`) instead of raw `useDispatch`/`useSelector`.

### Data types
All shared DTOs live in `src/api/services/types.ts`. `CheckInDto` is the core domain object — it has `id`, `date`, `situation`, `emotion[]` (name + intensity), `autoThought`, and `behavior`.

### Styling & theming
MUI v7 (dark mode) with a custom theme in `theme.ts`. The theme extends MUI's palette with a `neutral` color and customises `Button` variants. Font is `Geologica`. Use MUI components and the theme's design tokens rather than ad-hoc inline styles. CSS modules are used sparingly for layout overrides.

### Component organisation
```
src/components/
  atoms/        # Smallest reusable UI pieces
  cards/        # Card-style containers
  layouts/      # Page layout wrappers
  modal/        # Modal/dialog components
  navbar/       # Navigation bar
  page-elements/# Larger page-scoped sections
```

Pages live in `src/pages/` and are thin compositions of the above components.

### Testing
Jest + jsdom + Testing Library. CSS imports are proxied via `identity-obj-proxy`; other static assets via `__mocks__/fileMock.cjs`. Tests use `tsconfig.app.json` for TS compilation.
