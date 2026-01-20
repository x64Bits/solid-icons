/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vitest/config";
import solid from "vite-plugin-solid";

export default defineConfig({
  test: {
    include: ["./test/**.jsx"],
    exclude: ["./src/icons/**", "./node_modules/**"],
    watchExclude: ["./src/icons/**"],
    environment: "jsdom",
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
      registerNodeLoader: true,
    },
    threads: false,
    isolate: true,
    testTimeout: 15000,
  },
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"],
  },
});
