const path = require("path");

const { libModule, isolateModule } = require("./templates");

const MANIFEST_DIR = path.resolve(__dirname, "../manifest");
const WEB_DIR = path.resolve(__dirname, "../../web/public");
const SEARCH_FILE_PATH = path.resolve(WEB_DIR, "search.js");
const ROOT_DIR = path.resolve(__dirname, "..");

const defaultSearchFile = { icons: [] };

const templateType = {
  lib: (name, content) => libModule(name, content),
  isolate: (name, content) => isolateModule(name, content),
};

module.exports = {
  MANIFEST_DIR,
  SEARCH_FILE_PATH,
  ROOT_DIR,
  WEB_DIR,
  defaultSearchFile,
  templateType,
};
