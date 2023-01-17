import { Config } from "svgo";

export const svgoConfig: Config = {
  plugins: [
    "cleanupAttrs",
    "removeDoctype",
    "removeComments",
    "removeMetadata",
    "removeTitle",
    "removeDesc",
    "removeUselessDefs",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeEmptyContainers",
    "cleanupEnableBackground",
    "convertStyleToAttrs",
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
    "convertPathData",
    "convertTransform",
    "removeUnknownsAndDefaults",
    "removeNonInheritableGroupAttrs",
    "removeUselessStrokeAndFill",
    "removeUnusedNS",
    "cleanupIds",
    "cleanupNumericValues",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "mergePaths",
    "convertShapeToPath",
    "sortAttrs",
    "removeDimensions",
    {
      name: "removeAttributesBySelector",
      params: {
        selector: "*:not(svg)",
        attributes: ["stroke"],
      },
    },
    {
      name: "removeAttrs",
      params: { attrs: "data.*|class|xmlns" },
    },
  ],
};
