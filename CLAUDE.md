# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start SSR dev server at http://localhost:5173
pnpm build        # Type-check + build client & server bundles
pnpm lint         # ESLint (flat config)
pnpm test         # Jest
```

Run a single test file:
```bash
pnpm test src/App.test.tsx
```

**Package manager: pnpm only.**

## Architecture

This is a **React 18 + TypeScript + Vite SSR** app — a CBT-style mind journal ("check-in" logging). The dev server is a custom Express instance (`server.js`) that wires Vite's middleware in development and serves pre-built bundles in production. There is no standalone `vite dev` command; always use `pnpm dev`.

### SSR entry points
- `src/entry-client.tsx` — hydrates the server-rendered HTML in the browser
- `src/entry-server.tsx` — renders to HTML string on the server

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
All shared DTOs live in `src/api/services/types.ts`. `CheckInDto` is the core domain object — it has `id`, `date`, `situation`, `emotion[]` (name + intensity), `autoThoughts[]`, and `behavior`.

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
