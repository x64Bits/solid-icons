import fs from "fs";
import chalk from "chalk";
import { promisify } from "util";
import { exec } from "child_process";

import {
  DIST_PATH,
  log,
  includedFiles,
  ROOT_PATH,
  ROOT_EXPORT,
  LIB_PACKAGE_JSON,
  EXPORTS_KEYS,
} from "./constants";
import { fileTypes } from "./file-types";
import { getFileByPath } from "./get-icons";
import packages from "./packages.json" assert { type: "json" };
import { PackageJSONExport, PackAttachedIcons, PackItem } from "./types";

const execAsync = promisify(exec);

export async function prepareDist() {
  await Promise.all([execAsync("yarn build:lib", { cwd: ROOT_PATH })]);
  fs.appendFileSync(`${DIST_PATH}/lib/package.json`, LIB_PACKAGE_JSON);

  writeAssetsFiles();

  log(chalk.dim("🍬 Lib artifacts has been bundled") + chalk.green(" ✓"));
}

function getPackageExports(
  previousValue: PackageJSONExport,
  current: PackItem
): PackageJSONExport {
  const exportsTemplate = JSON.parse(`{
    "import": {
      "types": "./${current.shortName}/index.d.ts",
      "default": "./${current.shortName}/index.js"
    },
    "require": "./${current.shortName}/index.cjs",
    "browser": "./${current.shortName}/index.js",
    "node": "./${current.shortName}/index.cjs",
    "default": "./${current.shortName}/index.cjs"
  }`);

  const runtimeExports = [
    ...EXPORTS_KEYS.map((key) => ({
      [key]: exportsTemplate,
    })),
    {
      browser: {
        development: exportsTemplate,
        ...exportsTemplate,
      },
      ...exportsTemplate,
    },
  ];

  return {
    ...previousValue,
    [`./${current.shortName}`]: Object.assign({}, ...runtimeExports),
  };
}

function writeAssetsFiles() {
  includedFiles.forEach((file) => {
    fs.cpSync(`${ROOT_PATH}/${file}`, `${DIST_PATH}/${file}`);
  });

  const packageDotJson = JSON.parse(getFileByPath(`${ROOT_PATH}/package.json`));

  delete packageDotJson.devDependencies;
  delete packageDotJson.scripts;
  delete packageDotJson.type;
  delete packageDotJson.engines;
  packageDotJson.main = "./lib/index.cjs";
  packageDotJson.types = "./lib/index.d.ts";
  packageDotJson.module = "./lib/index.js";
  packageDotJson.unpkg = "./lib/index.cjs";

  packageDotJson.exports = {
    ["."]: ROOT_EXPORT,
    ...packages.reduce(getPackageExports, {}),
  };

  fs.appendFileSync(
    `${DIST_PATH}/package.json`,
    JSON.stringify(packageDotJson, null, 2)
  );
}

function writeEachPack(pack: PackAttachedIcons) {
  const packFolder = `${DIST_PATH}/${pack.shortName}`;

  fs.mkdirSync(packFolder);

  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index];
    const fileName = `${packFolder}/${type.fileName}`;

    fs.appendFileSync(fileName, type.header);
    pack.icons.forEach((icon) => {
      fs.appendFileSync(fileName, type.template(icon));
    });
  }

  log(
    chalk.white(`📦 ${pack.packName}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  );
}

export async function writeLibFiles(iconsPayload: PackAttachedIcons[]) {
  for (let index = 0; index < iconsPayload.length; index++) {
    writeEachPack(iconsPayload[index]);
  }
}
