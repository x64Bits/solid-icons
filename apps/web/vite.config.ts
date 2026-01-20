import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import fs from "fs";

export default defineConfig(({ mode, command }) => {
  const aliases: Record<string, string> = {
    "@public": "public",
    "~": path.resolve(__dirname, "./src"),
  };

  if (mode === "development" && command === "serve") {
    aliases["solid-icons"] = path.resolve(
      __dirname,
      "../../packages/solid-icons/dist",
    );
  }

  return {
    plugins: [
      solidPlugin() as any,
      {
        name: "serve-local-icons",
        configureServer(server) {
          server.middlewares.use("/icons", (req, res, next) => {
            const url = req.url || "";
            // req.url is relative to the mount point (/icons)
            const filePath = path.resolve(
              __dirname,
              "local-icons",
              url.startsWith("/") ? url.slice(1) : url
            );

            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader("Content-Type", "application/javascript");
              fs.createReadStream(filePath).pipe(res);
            } else {
              next();
            }
          });
        },
      },
    ],
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