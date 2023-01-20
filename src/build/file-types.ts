import type { IconContent } from "./types";
import { build, BuildOptions } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import { unlink } from "fs/promises";

function moduleTemplate(icon: IconContent) {
  return /* typescript */ `
export function ${icon.fileName}(props: IconProps): JSX.Element {
  const svgAttribs = ${JSON.stringify(icon.svgAttribs)};
  const mergedProps = mergeProps(svgAttribs, props);

  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      style={{
        ...props.style,
        overflow: "visible",
        color: props.color || "currentColor",
      }}
      {...mergedProps}
      height={props.size || "1em"}
      width={props.size || "1em"}
      xmlns="http://www.w3.org/2000/svg"
    >
      ${icon.contents}
      {props.title && <title>{props.title}</title>}
    </svg>
  );
}`;
}

function typesTemplate(icon: IconContent) {
  return /* typescript */ `\nexport declare function ${icon.fileName}(props: IconProps): JSX.Element`;
}

export const fileTypes = [
  {
    type: "tsx",
    template: moduleTemplate,
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* typescirpt */ `import type { JSX } from "solid-js";
import { type IconProps, mergeProps } from "../lib/index";
`,
    fileName: "index.tsx",
    postBuild: async (filePath: string) => {
      // build the tsx file with esbuild
      const esbuildOptions: BuildOptions = {
        entryPoints: [filePath],
        bundle: false,
        minify: true,
        sourcemap: false,
        target: "es2021",
        plugins: [solidPlugin()],
        write: true,
      };
      await Promise.all([
        build({
          ...esbuildOptions,
          format: "esm",
          outfile: filePath.replace(".tsx", ".js"),
        }),
        build({
          ...esbuildOptions,
          format: "cjs",
          outfile: filePath.replace(".tsx", ".cjs"),
        }),
      ]);
      // remove the tsx file
      await unlink(filePath);
    },
  },
  {
    type: "types",
    template: typesTemplate,
    header: /* typescirpt */ `import type { JSX } from "solid-js";
import { type IconProps } from "../lib/index";
`,
    fileName: "index.d.ts",
  },
];
