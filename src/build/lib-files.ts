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
import packages from "./packages.json" assert { type: "json" };
import { PackageJSONExport, PackAttachedIcons, PackItem } from "./types";
import { Worker } from "worker_threads";

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
      "node": "./${current.shortName}/index.cjs"
    }`);

  return {
    ...previousValue,
    [`./${current.shortName}`]: exportsPayload,
    [`./${current.shortName}/*`]: `./${current.shortName}/*.js`,
  };
}

async function writeAssetsFiles() {
  await Promise.all(
    includedFiles.map(async (file) => {
      return fs.copy(`${ROOT_PATH}/${file}`, `${DIST_PATH}/${file}`);
    })
  );

  const packageJson = await fs.readJson(`${ROOT_PATH}/package.json`);

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

function bundle(filePath: string) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/build/post-build.mjs", {
      workerData: filePath,
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Stopped the post build with code ${code}`));
    });
  });
}

const ignoredIcons = ["ImPagebreak"]; // due to the name conflict with ImPagebreak

async function writeEachPack(pack: PackAttachedIcons) {
  const packFolder = `${DIST_PATH}/${pack.shortName}`;

  await fs.mkdir(packFolder);

  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index];

    // write each icon to a new file
    await Promise.all(
      pack.icons.map(async (icon) => {
        if (ignoredIcons.includes(icon.fileName)) {
          return;
        }

        const filePath = `${packFolder}/${icon.fileName}${type.extension}`;
        await fs.appendFile(filePath, type.header + type.template(icon));
      })
    );
  }

  // create index.ts file
  const bundlePath = `${packFolder}/index.ts`;
  await fs.writeFile(
    bundlePath,
    pack.icons
      .map((icon) =>
        ignoredIcons.includes(icon.fileName)
          ? ""
          : `export { ${icon.fileName} } from "./${icon.fileName}";`
      )
      .join("\n")
  );
  // add types for the bundles
  await fs.copyFile(bundlePath, `${packFolder}/index.d.ts`);
  await fs.copyFile(bundlePath, `${packFolder}/index.d.cts`);

  // replace the ts file with the web js bundle
  await bundle(bundlePath);

  log(
    chalk.white(`📦 ${pack.packName}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  );
}

export async function writeLibFiles(iconsPayload: PackAttachedIcons[]) {
  return Promise.all(iconsPayload.map(writeEachPack));
}
