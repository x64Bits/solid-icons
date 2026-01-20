import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig(({ mode, command }) => {
  const aliases: Record<string, string> = {
    "@public": "public",
    "~": path.resolve(__dirname, "./src"),
  };

  if (mode === "development" && command === "serve") {
    aliases["solid-icons"] = path.resolve(
      __dirname,
      "../../packages/solid-icons2/dist",
    );
  }

  return {
    plugins: [solidPlugin() as any],
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
