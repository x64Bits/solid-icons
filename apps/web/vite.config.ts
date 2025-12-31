import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "solid-icons": path.resolve(__dirname, "../../packages/solid-icons/dist"),
      "@public": "public",
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
