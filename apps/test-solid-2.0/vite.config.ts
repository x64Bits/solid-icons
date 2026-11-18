import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import { solidIcons } from "solid-icons/vite";
import path from "path";

export default defineConfig({
  plugins: [solid(), solidIcons()],
  server: {
    fs: {
      allow: ["..", "../../packages/solid-icons"],
    },
  },
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "../shared-test-src"),
    },
  },
});
