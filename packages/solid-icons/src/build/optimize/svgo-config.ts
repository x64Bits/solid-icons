import { Config } from "svgo";

export const svgoConfig: Config = {
  plugins: [
    {
      name: "cleanupAttrs",
    },
    {
      name: "removeDoctype",
    },
    {
      name: "removeXMLProcInst",
    },
    {
      name: "removeComments",
    },
    {
      name: "removeMetadata",
    },
    {
      name: "removeTitle",
    },
    {
      name: "removeDesc",
    },
    {
      name: "removeUselessDefs",
    },
    {
      name: "removeEditorsNSData",
    },
    {
      name: "removeEmptyAttrs",
    },
    {
      name: "removeHiddenElems",
    },
    {
      name: "removeEmptyText",
    },
    {
      name: "removeEmptyContainers",
    },
    {
      name: "removeViewBox",
    },
    {
      name: "cleanupEnableBackground",
    },
    "convertStyleToAttrs",
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
    "convertPathData",
    "convertTransform",
    {
      name: "removeUnknownsAndDefaults",
    },
    {
      name: "removeNonInheritableGroupAttrs",
    },
    {
      name: "removeUselessStrokeAndFill",
    },
    {
      name: "removeUnusedNS",
    },
    {
      name: "cleanupNumericValues",
    },
    {
      name: "moveElemsAttrsToGroup",
    },
    {
      name: "moveGroupAttrsToElems",
    },
    {
      name: "collapseGroups",
    },
    {
      name: "removeRasterImages",
    },
    {
      name: "mergePaths",
    },
    {
      name: "convertShapeToPath",
      params: {
        convertArcs: true,
      },
    },
    {
      name: "sortAttrs",
    },
    {
      name: "removeDimensions",
    },
    {
      name: "removeAttributesBySelector",
      params: {
        selector: "*:not(svg)",
        attributes: ["stroke"],
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: ["data.*", "class", "xmlns"],
      },
    },
  ],
};
