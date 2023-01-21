import { build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import { unlink } from "fs/promises";

import { workerData, parentPort } from "worker_threads";

postBuild(workerData);
parentPort.postMessage(undefined);

/**
 * @param {string} filePath
 * @returns {Promise<void>}
 */
async function postBuild(filePath) {
  // build the tsx file with esbuild
  /** @type {import("esbuild").BuildOptions} */
  const esbuildOptions = {
    entryPoints: [filePath],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: "es2021",
    write: true,
  };
  await Promise.all([
    build({
      ...esbuildOptions,
      format: "esm",
      outfile: filePath.replace(".ts", ".js"),
      plugins: [solidPlugin({ babel: { compact: true } })],
    }),
    build({
      ...esbuildOptions,
      format: "cjs",
      outfile: filePath.replace(".ts", ".cjs"),
      plugins: [
        solidPlugin({
          babel: { compact: true },
          solid: { ssr: true, hydratable: true },
        }),
      ],
    }),
  ]);
  // remove the tsx file
  await unlink(filePath);
  console.log(`Finished building ${filePath}`);
}
