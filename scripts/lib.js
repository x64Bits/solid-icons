const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const appendFile = promisify(fs.appendFile);

const { OUT_DIR } = require("./constants");

const PACKAGE_JSON_LIB = `{
  "main": "./server/index.common.js",
  "module": "./browser/index.module.js"
}
`;

async function moveLibraryArtifacts() {
  await Promise.all([
    exec(`mkdir ${OUT_DIR}/lib`),
    exec(`mv ${OUT_DIR}/browser ${OUT_DIR}/lib`),
    exec(`mv ${OUT_DIR}/server ${OUT_DIR}/lib`),
  ]);

  await appendFile(
    path.resolve(`${OUT_DIR}/lib`, "package.json"),
    PACKAGE_JSON_LIB
  );
}

module.exports = {
  moveLibraryArtifacts,
};
