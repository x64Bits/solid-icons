import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const DEFAULT_WEB_PATH = "../../apps/web/public";

export const ROOT_PATH = path.resolve();
export const DIST_PATH = path.resolve("./dist");
export const WEB_PATH = path.resolve(
  ROOT_PATH,
  process.env.WEB_PATH || DEFAULT_WEB_PATH
);
export const WEB_ICONS_PATH = path.resolve(WEB_PATH, "icons");
export const log = console.log;

export const LIB_PACKAGE_JSON = /* javascript */ `{
  "main": "./index.jsx",
  "module": "./index.jsx",
  "solid": "./index.jsx",
  "types": "./index.d.ts",
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "solid": "./index.jsx",
      "import": "./index.jsx",
      "default": "./index.jsx"
    }
  }
}`;

export const ROOT_EXPORT = {
  types: "./lib/index.d.ts",
  solid: "./lib/index.jsx",
  import: "./lib/index.jsx",
  default: "./lib/index.jsx",
  browser: "./lib/index.jsx",
  node: "./lib/index.jsx",
  astro: "./lib/index.jsx",
};

export const includedFiles = ["LICENSE", "README.md"];

export const tinyStyles: Record<string, string> = {
  Filled: "Fill",
  Outlined: "Outline",
  undefined: "",
};

export const supportedArgs = {
  ISOLATE: "--isolate",
  WEB: "--web",
};

export const NORMALIZE_PACK: Record<string, string> = {
  AI: "ai",
  IO: "io",
  HI: "hi",
  TB: "tb",
  RI: "ri",
  FI: "fi",
};

export const NORMALIZE_FILE_NAME = {
  WI: "wi",
  IM: "im",
  BI: "bi",
  OC: "oc",
};

export const EXPORTS_KEYS = ["worker", "deno", "node", "development"];
