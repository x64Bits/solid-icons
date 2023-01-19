import type { IconContent } from "./types";
import { Worker } from "worker_threads";

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
    postBuild: function runService(filePath: string) {
      return new Promise((resolve, reject) => {
        const worker = new Worker("./src/build/post-build.mjs", { workerData: filePath });
        worker.on("message", resolve);
        worker.on("error", reject);
        worker.on("exit", (code) => {
          if (code !== 0)
            reject(
              new Error(`Stopped the post build with code ${code}`)
            );
        });
      });
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
