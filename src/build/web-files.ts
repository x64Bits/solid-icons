import fs from "fs";
import chalk from "chalk";
import { promisify } from "util";
import { exec } from "child_process";

import {
  DIST_PATH,
  LIB_PACKAGE_JSON,
  log,
  PACK_PACKAGE_JSON,
  includedFiles,
  ROOT_PATH,
  WEB_ICONS_PATH,
  WEB_PATH,
  ROOT_EXPORT,
} from "./constants";
import { fileTypes } from "./file-types";
import { getFileByPath } from "./get-icons";
import packages from "./packages.json" assert { type: "json" };
import {
  IconContent,
  PackageJSONExport,
  PackAttachedIcons,
  PackItem,
} from "./types";

const rmAsync = promisify(fs.rm);

export async function writeWebFiles(packs: PackAttachedIcons[]) {
  const iconNames = {
    icons: packs.reduce(
      (prev: string[], crr: PackAttachedIcons) => [
        ...prev,
        ...crr.icons.map((icon: IconContent) => icon.fileName),
      ],
      []
    ),
  };

  await rmAsync(WEB_ICONS_PATH, { recursive: true, force: true });
  fs.mkdirSync(WEB_ICONS_PATH);

  await rmAsync(`${WEB_PATH}/search.js`, { recursive: true, force: true });
  await rmAsync(`${WEB_PATH}/meta.js`, { recursive: true, force: true });

  fs.appendFileSync(
    `${WEB_PATH}/search.js`,
    `export default ${JSON.stringify(iconNames)}`
  );

  fs.appendFileSync(
    `${WEB_PATH}/meta.js`,
    `export default ${JSON.stringify(packages)}`
  );

  packs.forEach(writeEachWebFiles);
}

async function writeEachWebFiles(pack: PackAttachedIcons) {
  const packFolder = `${WEB_ICONS_PATH}/${pack.shortName}`;

  fs.mkdirSync(packFolder);

  pack.icons.forEach((icon) => {
    fs.appendFileSync(
      `${packFolder}/${icon.fileName}.js`,
      `export default ${JSON.stringify({
        a: icon.svgAttribs,
        c: icon.contents,
      })}`
    );
  });

  log(
    chalk.white(`🌐 ${pack.packName}`) +
      chalk.dim(" website Package generated") +
      chalk.green(" ✓")
  );
}
