import { promisify } from "util";
import { exec } from "child_process";

import { ROOT_PATH } from "./constants";
import packages from "./packages.json" assert { type: "json" };
import { PackItem } from "./types";

const execAsync = promisify(exec);

async function execCommand(submodule: PackItem) {
  return await execAsync(
    `git submodule add ${submodule.url} ./src/icons/${submodule.folderName} -f --depth 1`,
    { cwd: ROOT_PATH }
  );
}

async function init() {
  for (let index = 0; index < packages.length; index++) {
    const submodule = packages[index];

    await execCommand(submodule);
  }
}

init();
