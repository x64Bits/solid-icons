import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig(({ mode }) => {
  const aliases = {
    "@public": "public",
    "~": path.resolve(__dirname, "./src"),
  };

  if (mode === "development") {
    aliases["solid-icons"] = path.resolve(
      __dirname,
      "../../packages/solid-icons/dist"
    );
  }

  return {
    plugins: [solidPlugin()],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
    resolve: {
      alias: aliases,
    },
  };
});
