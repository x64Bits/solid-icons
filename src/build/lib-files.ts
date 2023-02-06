import fs from "fs-extra";
import chalk from "chalk";
import { promisify } from "util";
import { exec } from "child_process";
import { cpus, pool } from "workerpool";

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
import type { postBuild } from "./post-build";

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
      "node": "./${current.shortName}/index.ssr.js"
    }`);

  return {
    ...previousValue,
    [`./${current.shortName}`]: exportsPayload,
    [`./${current.shortName}/*`]: `./${current.shortName}/*.jsx`,
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

const ignoredIcons = ["ImPagebreak"]; // due to the name conflict with ImPagebreak

const postBuildPool = pool("./src/build/post-build.js", {
  maxWorkers: Math.min(4, cpus - 1),
});

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
  await fs.copyFile(bundlePath, `${packFolder}/index.ssr.d.ts`);

  // replace the ts file with the web js bundle
  const postBuildWorker = await postBuildPool.proxy<{
    postBuild: typeof postBuild;
  }>();
  await await postBuildWorker.postBuild(bundlePath);

  log(
    chalk.white(`📦 ${pack.packName}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  );
}

export async function writeLibFiles(iconsPayload: PackAttachedIcons[]) {
  await Promise.all(iconsPayload.map(writeEachPack));
  await postBuildPool.terminate();
}
