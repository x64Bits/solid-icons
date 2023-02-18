import { dirname } from "path";
import { build, InlineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { worker } from "workerpool";

function getOptions(filePath: string, server: boolean): InlineConfig {
  return {
    build: {
      lib: {
        entry: filePath,
        formats: ["es"],
      },
      outDir: dirname(filePath),
      minify: true,
      sourcemap: true,
      write: true,
      emptyOutDir: false,
      rollupOptions: {
        input: filePath,
        external: ["solid-js", "solid-js/web"],
        output: {
          entryFileNames: server ? "index.ssr.js" : "index.js",
        },
      },
      ssr: server,
    },
    plugins: [
      solidPlugin({
        babel: { compact: true },
        solid: { hydratable: true, generate: server ? "ssr" : "dom" },
        ssr: server,
        dev: false,
      }),
    ],
  };
}

/**
 * Bundle the icons with vite and vite-plugin-solid
 *
 * This builds two bundles, one for the client and one for the server.
 */
export async function postBuild(filePath: string) {
  process.env.NODE_ENV = "production";
  await Promise.all([
    // Build the client bundle
    build(getOptions(filePath, false)),
    // Build the server bundle
    build(getOptions(filePath, true)),
  ]);
}

worker({
  postBuild,
});
