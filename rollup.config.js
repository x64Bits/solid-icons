import withSolid from "rollup-preset-solid";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default withSolid([
  {
    input: "src/IconWrapper.tsx",
    mappingName: "browser",
  },
  {
    input: "src/IconWrapper.tsx",
    mappingName: "server",
    solidOptions: { generate: "ssr", hydratable: false },
    targets: ["cjs"],
    plugins: [commonjs(), babel({ babelHelpers: "bundled" })],
  },
]);
