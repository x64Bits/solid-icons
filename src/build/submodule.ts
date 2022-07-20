import { promisify } from "util";
import { exec } from "child_process";

import { ROOT_PATH } from "./constants";
import packages from "./packages.json" assert { type: "json" };

const execAsync = promisify(exec);

const submodules = packages.map((pack) => ({
  path: pack.path.slice(2),
  url: pack.url,
}));

function init() {
  Promise.all(
    submodules.map(async (submodule) => {
      await execAsync(
        `git submodule add ${submodule.url} ./${submodule.path} -f --depth 1`,
        { cwd: ROOT_PATH }
      );
    })
  );
}

init();
