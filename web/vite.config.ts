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
  },
  server: {
    // In dev, the Go API runs on :8080. Proxying keeps the browser on one origin,
    // same as prod (Caddy serves the SPA and forwards /api/* to the API).
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
