import fs from "fs";
import path from "path";

import { ROOT_PATH } from "./constants";

export function getPackFiles(dirPath: string, files: string[] = []): string[] {
  let paths = fs.readdirSync(dirPath);

  for (let current = 0; current < paths.length; current++) {
    const file = paths[current];

    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      files = getPackFiles(`${dirPath}/${file}`, files);
    } else if (file.includes(".svg")) {
      files.push(path.join(ROOT_PATH, dirPath, "/", file));
    }
  }

  return files;
}
