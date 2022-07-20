import withSolid from "rollup-preset-solid";

export default withSolid([
  {
    input: "src/lib/IconWrapper.tsx",
    mappingName: "lib",
  },
  {
    input: "src/lib/IconWrapper.tsx",
    mappingName: "lib",
    solidOptions: {
      generate: "ssr",
      hydratable: false,
    },
    targets: ["cjs"],
  },
]);
