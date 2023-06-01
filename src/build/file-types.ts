import type { IconContent } from "./types";

function cjsTemplate(icon: IconContent): string {
  return /* javascript */ `
  module.exports.${icon.fileName} = function ${icon.fileName}(props) {
      return IconTemplate({
        a: ${JSON.stringify(icon.svgAttribs)},
        c: '${icon.contents}'
      }, props)
  }`;
}

function moduleTemplate(icon: IconContent) {
  return /* javascript */ `
  export function ${icon.fileName}(props) {
      return IconTemplate({
        a: ${JSON.stringify(icon.svgAttribs)},
        c: '${icon.contents}'
      }, props)
  }`;
}

function typesTemplate(icon: IconContent) {
  return /* javascript */ `\nexport declare const ${icon.fileName}: IconTypes;`;
}

export const fileTypes = [
  {
    type: "cjs",
    template: (iconContent: IconContent) => cjsTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `var IconTemplate = require('../lib/index.cjs').IconTemplate;`,
    fileName: "index.cjs",
  },
  {
    type: "mjs",
    template: (iconContent: IconContent) => moduleTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import { IconTemplate } from "../lib/index.js";`,
    fileName: "index.js",
  },
  {
    type: "types",
    template: (iconContent: IconContent) => typesTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import type { IconTypes } from "../lib/index"\n`,
    fileName: "index.d.ts",
  },
];
