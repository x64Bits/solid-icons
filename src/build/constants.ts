import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const DEFAULT_WEB_PATH = "../web/public";

export const ROOT_PATH = path.resolve();
export const DIST_PATH = path.resolve("./dist");
export const WEB_PATH = path.resolve(
  ROOT_PATH,
  process.env.WEB_PATH || DEFAULT_WEB_PATH
);
export const WEB_ICONS_PATH = path.resolve(WEB_PATH, "icons");
export const log = console.log;

export const LIB_PACKAGE_JSON = /* javascript */ `{
  "main": "./index.cjs",
  "module": "./index.js"
}`;

export const PACK_PACKAGE_JSON = /* javascript */ `{
  "sideEffects": false,
  "module": "./index.js"
}`;

export const ROOT_EXPORT = {
  browser: "./lib/index.js",
  node: "./lib/index.cjs",
  default: "./lib/index.cjs",
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
};

export const NORMALIZE_FILE_NAME: Record<string, string> = {
  WI: "wi",
  IM: "im",
  BI: "bi",
};
