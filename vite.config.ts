import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  root: "templates",
  build: {
    outDir: "../dist/lib",
    target: "esnext",
    polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, "templates/IconTemplate.jsx"),
      name: "solidjs-icons",
      fileName: "main",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["solid-js"],
    },
  },
});
