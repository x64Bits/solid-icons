import type { IconContent } from "./types";

function iconCjsTemplate(icon: IconContent): string {
  return /* javascript */ `
module.exports = function ${icon.fileName}(props) {
  return IconTemplate({
    a: ${JSON.stringify(icon.svgAttribs)},
    c: '${icon.contents}'
  }, props)
};`;
}

function iconModuleTemplate(icon: IconContent) {
  return /* javascript */ `
export function ${icon.fileName}(props) {
  return IconTemplate({
    a: ${JSON.stringify(icon.svgAttribs)},
    c: '${icon.contents}'
  }, props)
}`;
}

function iconTypesTemplate(icon: IconContent) {
  return /* javascript */ `export declare const ${icon.fileName}: IconTypes;`;
}

function indexCjsTemplate(icon: IconContent) {
  return /* javascript */ `module.exports.${icon.fileName} = require("./icons/${icon.fileName}.cjs");`;
}

function indexModuleTemplate(icon: IconContent) {
  return /* javascript */ `export { ${icon.fileName} } from "./icons/${icon.fileName}.js";`;
}

function indexTypesTemplate(icon: IconContent) {
  return /* javascript */ `export { ${icon.fileName} } from "./icons/${icon.fileName}";`;
}

export const iconFileTypes = [
  {
    type: "cjs",
    template: (iconContent: IconContent) => iconCjsTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `var IconTemplate = require('../../lib/index.cjs').IconTemplate;`,
    fileExt: "cjs",
  },
  {
    type: "mjs",
    template: (iconContent: IconContent) => iconModuleTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import { IconTemplate } from "../../lib/index.jsx";`,
    fileExt: "js",
  },
  {
    type: "types",
    template: (iconContent: IconContent) => iconTypesTemplate(iconContent),
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import type { IconTypes } from "../../lib/index";`,
    fileExt: "d.ts",
  },
];

export const indexFileTypes = [
  {
    type: "cjs",
    template: (iconContent: IconContent) => indexCjsTemplate(iconContent),
    header: "",
    fileName: "index.cjs",
  },
  {
    type: "mjs",
    template: (iconContent: IconContent) => indexModuleTemplate(iconContent),
    header: "",
    fileName: "index.js",
  },
  {
    type: "types",
    template: (iconContent: IconContent) => indexTypesTemplate(iconContent),
    header: "",
    fileName: "index.d.ts",
  },
];
