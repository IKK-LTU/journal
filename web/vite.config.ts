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
  server: {
    // In dev, the Go API runs on :8080. Proxying keeps the browser on one origin,
    // same as prod (Caddy serves the SPA and forwards /api/* to the API).
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
