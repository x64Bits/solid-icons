import fs from "fs-extra";
import chalk from "chalk";

import { log, WEB_ICONS_PATH, WEB_PATH } from "./constants";
import { IconContent, PackAttachedIcons } from "./types";


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

  await fs.remove(WEB_ICONS_PATH);
  fs.mkdirSync(WEB_ICONS_PATH);

  await fs.remove(`${WEB_PATH}/search.js`);
  await fs.remove(`${WEB_PATH}/meta.js`);

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
