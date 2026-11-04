import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Vite 7 defaults to Safari 16+. iPhones that can't update past iOS 15 would get syntax they
    // don't understand; this transpiles the syntax down. (Missing *APIs* still need care in code.)
    target: ["es2020", "safari14", "chrome90", "firefox90"],
    // Production code is minified (names shortened to "a", "b"…). Source maps let browser DevTools
    // and error reports show the real file, function and line. The repo is public, so nothing leaks.
    sourcemap: true,
  },
  server: {
    // In dev, the Go API runs on :8080. Proxying keeps the browser on one origin,
    // same as prod (Caddy serves the SPA and forwards /api/* to the API).
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
