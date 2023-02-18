import fs from "fs-extra";
import path from "path";

import { ROOT_PATH } from "./constants";

export async function getPackFiles(
  dirPath: string,
  files: string[] = []
): Promise<string[]> {
  const paths = await fs.readdir(dirPath);

  for (let current = 0; current < paths.length; current++) {
    const file = paths[current];

    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      files = await getPackFiles(`${dirPath}/${file}`, files);
    } else if (file.includes(".svg")) {
      files.push(path.join(ROOT_PATH, dirPath, "/", file));
    }
  }

  return files;
}
