# AI Coding Agent Instructions - Journal Project

## Project Overview
**Journal** is a minimal React + TypeScript + Vite application scaffolded from the default Vite + React template. It's a "mind journal" project in early development with a basic counter component demonstrating HMR (Hot Module Replacement) capabilities.

## Tech Stack & Architecture
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.2+ (fast development server & production bundler)
- **Language**: TypeScript ~5.9 with strict type checking
- **Styling**: CSS modules pattern (files in `src/` with corresponding `.css` imports)
- **Linting**: ESLint with TypeScript, React Hooks, and React Refresh plugins

### Key Entry Points
- `src/main.tsx` - Application entry point; renders App component into root DOM element with StrictMode
- `src/App.tsx` - Root React component (currently demo counter; will be replaced with journal features)
- `src/index.css` - Global styles
- `public/vite.svg` - Static asset served directly from Vite's public directory

## Developer Workflows

### Starting Development
```bash
pnpm dev
```
Runs Vite dev server on `http://localhost:5173` with HMR enabled. Changes to `.tsx` files trigger instant browser refresh.

### Building for Production
```bash
pnpm build
```
Runs TypeScript type-check (`tsc -b`) then Vite production build. Output goes to `dist/` directory.

### Code Quality
```bash
pnpm lint
```
Runs ESLint on all TypeScript/TSX files using the flat config (`eslint.config.js`).

### Preview Production Build
```bash
pnpm preview
```
Serves the built artifacts locally to verify production behavior.

## Code Patterns & Conventions

### React Component Structure
- Use functional components with hooks (no class components)
- Example from `App.tsx`: Import assets, use `useState` for local state, export as default
- Keep components focused; UI demo components will be replaced with journal-specific features

### TypeScript Configuration
- `tsconfig.json` references `tsconfig.app.json` (app code) and `tsconfig.node.json` (build tooling)
- Strict type checking enabled; avoid `any` types where possible
- DOM types available via `typescript` and `@types/react`

### Styling
- Colocated CSS files imported directly: `import './App.css'` in components
- Use classNames from CSS file in component JSX
- Vite handles CSS extraction and bundling automatically

### Static Assets
- Place images/icons in `src/assets/` for bundled assets (hashed filenames in production)
- Place assets in `public/` for direct serving without hashing (e.g., `vite.svg`)

## ESLint Configuration
- Uses ESLint flat config format (new standardized config)
- Enforces React Hooks rules and React Refresh best practices
- Ignores `dist/` build directory
- When adding new dependencies affecting linting, update `eslint.config.js` accordingly

## Important Notes for Agents
1. **Project Phase**: Currently a scaffold/template state. Most development will involve replacing placeholder demo code with actual journal features.
2. **React Refresh**: Preserve the React Refresh plugin setup—it enables fast HMR without full page reloads.
3. **Type Safety**: Maintain TypeScript's type strictness when adding features; leverage types to catch bugs early.
4. **Build Dependencies**: Vite is production-focused; never commit `dist/` or `node_modules/` (already ignored).
5. **pnpm**: This project uses pnpm package manager (not npm/yarn). Use `pnpm` commands consistently.

## File Structure Reference
```
journal/
├── src/
│   ├── App.tsx          # Root component (replace with journal UI)
│   ├── App.css          # Component styling
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── assets/          # Bundled images/icons
├── public/              # Static files (served as-is)
├── vite.config.ts       # Vite configuration (React plugin enabled)
├── eslint.config.js     # ESLint rules (flat config)
├── tsconfig.json        # TypeScript root config
└── package.json         # Dependencies & scripts
```

## Integration Points
- **React DevTools**: Browser extension useful for debugging component state/props
- **Vite HMR**: Automatically configured; inspect via browser console if issues occur
- **TypeScript Compiler**: Runs as part of build pipeline; errors block production builds

---
*Last updated: January 2026. Project in active scaffolding phase.*
