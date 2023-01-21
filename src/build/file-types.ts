import type { IconContent } from "./types";

function moduleTemplate(icon: IconContent) {
  return /* javascript */ `
export function ${icon.fileName}(props) {
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
    template: moduleTemplate,
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import { mergeProps } from "../lib/index.js";
`,
    extension: ".jsx",
  },
  {
    template: typesTemplate,
    header: /* typescirpt */ `import { type JSX } from "solid-js";
import { type IconProps } from "../lib/index";
`,
    extension: ".d.ts",
  },
];
