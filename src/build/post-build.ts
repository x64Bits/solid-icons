import { build, BuildOptions } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import { unlink } from "fs/promises";
import { worker } from "workerpool";

/**
 */
export async function postBuild(filePath: string) {
  // build the tsx file with esbuild
  const esbuildOptions: BuildOptions = {
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
          solid: { generate: "ssr", hydratable: true },
        }),
      ],
    }),
  ]);
  // remove the tsx file
  await unlink(filePath);
}

worker({
  postBuild,
});
