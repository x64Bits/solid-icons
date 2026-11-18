import type { IconContent } from "./types";

function indexModuleTemplate(icon: IconContent) {
  return `export function ${icon.fileName}(props){return IconTemplate({a:${JSON.stringify(icon.svgAttribs)},c:'${icon.contents}'},props)}`;
}

function indexTypesTemplate(icon: IconContent) {
  return `export declare const ${icon.fileName}: IconTypes;`;
}

export const indexFileTypes = [
  {
    type: "mjs",
    template: (iconContent: IconContent) => indexModuleTemplate(iconContent),
    header: "import { IconTemplate } from '../lib/index.jsx';",
    fileName: "index.js",
  },
  {
    type: "jsx",
    rawContent: 'export * from "./index.js";\n',
    fileName: "index.jsx",
  },
  {
    type: "types",
    template: (iconContent: IconContent) => indexTypesTemplate(iconContent),
    header: "import type { IconTypes } from '../lib/index';",
    fileName: "index.d.ts",
  },
];
