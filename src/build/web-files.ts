import fs from "fs";
import chalk from "chalk";
import { promisify } from "util";

import { log, WEB_ICONS_PATH, WEB_PATH } from "./constants";
import { IconContent, PackAttachedIcons } from "./types";

const rmAsync = promisify(fs.rm);

function attachCountIcons(packs: PackAttachedIcons[]) {
  return packs.map((pack) => ({
    ...pack,
    count: pack.icons.length,
    icons: undefined,
  }));
}

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

  const metaFile = attachCountIcons(packs);

  fs.appendFileSync(
    `${WEB_PATH}/meta.js`,
    `export default ${JSON.stringify(metaFile)}`
  );

  packs.forEach(writeEachWebFiles);

  const count = packs
    .map((pack) => pack.icons.length)
    .reduce((prev, crr) => Number(prev) + Number(crr), 0);

  log(
    chalk.white(`➕ ${count}`) +
      chalk.dim(" icons generated") +
      chalk.green(" ℹ️")
  );
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
