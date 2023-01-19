import { Config } from "svgo";

export const svgoConfig: Config = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeXMLProcInst: false,
          removeViewBox: false,
        },
      },
    },
    "convertStyleToAttrs",
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
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
