import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import fs from "fs";

export default defineConfig(({ mode, command }) => {
  const aliases: Record<string, string> = {
    "@public": "public",
    "~": path.resolve(__dirname, "./src"),
  };

  aliases["solid-icons"] = path.resolve(
    __dirname,
    "../../packages/solid-icons/dist"
  );

  return {
    plugins: [
      solidPlugin() as any,
      {
        name: "serve-local-icons",
        configureServer(server) {
          const packCache = new Map<string, string>();
          const iconCache = new Map<string, string>();

          server.middlewares.use("/icons", (req, res, next) => {
            const url = req.url || "";
            // req.url is relative to the mount point (/icons), e.g. "/ai/AiFillCamera.js"
            const relPath = url.startsWith("/") ? url.slice(1) : url;
            const cleanPath = relPath.split("?")[0];

            // 1. Check if physical file exists in any candidate folder
            const candidates = [
              path.resolve(__dirname, "local-icons", cleanPath),
              path.resolve(
                __dirname,
                "../../packages/solid-icons/dist_all/icons",
                cleanPath
              ),
              path.resolve(__dirname, "public/icons", cleanPath),
            ];

            for (const filePath of candidates) {
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                res.setHeader("Content-Type", "application/javascript");
                return fs.createReadStream(filePath).pipe(res);
              }
            }

            // 2. On-the-fly extraction from packages/solid-icons/dist/${packID}/index.js
            const parts = cleanPath.split("/");
            if (parts.length === 2 && parts[1].endsWith(".js")) {
              const packID = parts[0];
              const iconName = parts[1].slice(0, -3);

              if (iconCache.has(cleanPath)) {
                res.setHeader("Content-Type", "application/javascript");
                res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
                return res.end(iconCache.get(cleanPath));
              }

              const distPackPath = path.resolve(
                __dirname,
                "../../packages/solid-icons/dist",
                packID,
                "index.js"
              );

              if (fs.existsSync(distPackPath)) {
                if (!packCache.has(packID)) {
                  packCache.set(packID, fs.readFileSync(distPackPath, "utf8"));
                }
                const code = packCache.get(packID)!;
                const regex = new RegExp(
                  `export function ${iconName}\\(props\\)\\{return IconTemplate\\((\\{.+?\\}),props\\)\\}`
                );
                const match = code.match(regex);
                if (match && match[1]) {
                  const content = `export default ${match[1]};`;
                  iconCache.set(cleanPath, content);
                  res.setHeader("Content-Type", "application/javascript");
                  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
                  return res.end(content);
                }
              }
            }

            next();
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