import fs from "fs-extra";
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
} from "./constants";
import { fileTypes } from "./file-types";
import { getFileByPath } from "./get-icons";
import packages from "./packages.json" assert { type: "json" };
import { PackageJSONExport, PackAttachedIcons, PackItem } from "./types";

const execAsync = promisify(exec);

export async function prepareDist() {
  await Promise.all([execAsync("yarn build:lib", { cwd: ROOT_PATH })]);
  await fs.appendFile(`${DIST_PATH}/lib/package.json`, LIB_PACKAGE_JSON);

  await writeAssetsFiles();

  log(chalk.dim("🍬 Lib artifacts has been bundled") + chalk.green(" ✓"));
}

function getPackageExports(
  previousValue: PackageJSONExport,
  current: PackItem
): PackageJSONExport {
  const exportsPayload = JSON.parse(`{
      "browser": "./${current.shortName}/index.js",
      "node": "./${current.shortName}/index.cjs",
      "default": "./${current.shortName}/index.cjs"
    }`);

  return { ...previousValue, [`./${current.shortName}`]: exportsPayload };
}

async function writeAssetsFiles() {
  await Promise.all(
    includedFiles.map(async (file) => {
      return fs.copy(`${ROOT_PATH}/${file}`, `${DIST_PATH}/${file}`);
    })
  );

  const packageJson = JSON.parse(
    await getFileByPath(`${ROOT_PATH}/package.json`)
  );

  delete packageJson.devDependencies;
  delete packageJson.scripts;
  delete packageJson.type;
  packageJson.exports = {
    ["."]: ROOT_EXPORT,
    ...packages.reduce(getPackageExports, {}),
  };

  await fs.appendFile(
    `${DIST_PATH}/package.json`,
    JSON.stringify(packageJson, null, 2)
  );

  await fs.copyFile(
    `${ROOT_PATH}/tsconfig.dist.json`,
    `${DIST_PATH}/tsconfig.json`
  );
}

async function writeEachPack(pack: PackAttachedIcons) {
  const packFolder = `${DIST_PATH}/${pack.shortName}`;

  await fs.mkdir(packFolder);

  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index];
    const filePath = `${packFolder}/${type.fileName}`;

    fs.appendFileSync(filePath, type.header);
    pack.icons.forEach((icon) => {
      fs.appendFileSync(filePath, type.template(icon));
    });

    await type.postBuild?.(filePath);
  }

  log(
    chalk.white(`📦 ${pack.packName}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  );
}

export async function writeLibFiles(iconsPayload: PackAttachedIcons[]) {
  return Promise.all(iconsPayload.map(writeEachPack));
}
