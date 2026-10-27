# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Vite dev server at http://localhost:5173 (/api proxied to :8080)
pnpm build        # Type-check + build static SPA into dist/
pnpm typecheck    # tsc -b only
pnpm lint         # ESLint (flat config)
pnpm test         # Jest (unit + smoke tests)
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
`@/` maps to `src/`. Use it for imports across folders; files in the same folder import each other relatively (`./EntryCard`).

### Routing
React Router DOM. Routes are in `src/router/routes.ts` (`ROUTES`, `getEntryPath`, router-state types), wired in `src/router/index.tsx`.
Screens: `/` welcome, `/login`, `/home` (feed + week insight card), `/new-entry` (7-step flow, `components/entry-flow/steps.ts`), `/entry/:id`, `/insights`, `/settings`.

### State management
Redux Toolkit:
- `store/features/checkins.ts` — entries + memoized selectors (`selectEntriesGroupedByDay`, `selectDatesWithEntries`, `selectEmotionUsage`). Persisted to `localStorage` via `store/checkinsStorage.ts` until the API lands.
- `store/features/user.ts` — current user (demo login).

Use typed hooks from `src/store/hooks.ts` (`useAppDispatch`, `useAppSelector`).
The new-entry flow keeps its own draft (`components/entry-flow/useEntryDraft.ts`, autosaved to localStorage) and validates per step with the pure `validateStep()`.
Insights are pure functions in `utils/insights.ts`; feelings come from the Lithuanian Feelings Wheel in `constants/emotions.ts`.

### Data types
`CheckInDto` (`src/api/services/types.ts`): `id`, `date` (local YYYY-MM-DD), `createdAt` (ISO), `emotion[]` (name + intensity 1–10), `place`, `people[]`, `situation`, `autoThought`, `reactions[]`, `behavior`, `emotionAfter[]`. Everything except `emotion` and `situation` may be empty. Old stored entries are normalized in `store/checkinsStorage.ts`.

### Design & theming
- Minimal "paper journal", same palette as the landing page. Tokens live in `theme.ts` (MUI `colorSchemes`, CSS variables, class on `<html>`).
- Light / dark / system: `useColorScheme()` in Settings; `index.html` applies the saved mode before first paint.
- Color only on the primary action (sage). Sections are separated by a slightly different background — no borders, no shadows.
- 16px gutters, 16px card padding, 12px radius. Serif `variant="display"` for page titles, Geologica for everything else.
- All UI copy is Lithuanian (`<html lang="lt">`). Plurals via `utils/plural.ts`.

### Component organisation
```
src/components/
  ui/          # PageShell, BackButton, EmotionIcon, Toast
  home/        # HomeHeader, WeekStrip, DayGroup, EntryCard
  entry-flow/  # steps, header/footer, draft hook, validation
```
Pages in `src/pages/` compose these.

### Testing
Jest + jsdom + Testing Library. ts-jest only transpiles (CommonJS settings in `jest.config.cjs`); type checking is `pnpm typecheck`. `jest.setup.cjs` polyfills TextEncoder and matchMedia. Tests sit next to the code (`*.test.ts`).
