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
    plugins: [solidPlugin({ babel: { compact: true } })],
    write: true,
  };
  await Promise.all([
    build({
      ...esbuildOptions,
      format: "esm",
      outfile: filePath.replace(".ts", ".js"),
    }),
    build({
      ...esbuildOptions,
      format: "cjs",
      outfile: filePath.replace(".ts", ".cjs"),
    }),
  ]);
  // remove the tsx file
  await unlink(filePath);
  console.log(`Finished building ${filePath}`);
}
