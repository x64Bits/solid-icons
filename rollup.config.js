import withSolid from "rollup-preset-solid";

export default withSolid({
  input: "src/IconWrapper.tsx",
  printInstructions: true,
  output: [
    {
      file: "./manifest/lib/index.js",
      format: "esm",
    },
  ],
});
