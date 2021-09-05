const path = require("path");

const { libModule, isolateModule } = require("./templates");

const MANIFEST_DIR = path.resolve(__dirname, "../manifest");
const SEARCH_FILE_PATH = path.resolve(MANIFEST_DIR, "search.json");
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
  defaultSearchFile,
  templateType,
};
