import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true, // lets RTL auto-clean up between tests
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
    // Vitest doesn't load .env.local, and src/config/env.ts throws without this
    env: {
      NEXT_PUBLIC_API_URL: "http://localhost:4000",
    },
    css: false,
  },
});