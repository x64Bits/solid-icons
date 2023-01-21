import { pool } from "workerpool";

import { getPackFiles } from "./get-files";
import type { IconContent, PackItem } from "./types";
import type { getIconContent } from "./get-icon";

const getIconContentPool = pool("./src/build/get-icon.js");

export async function getIcons(pack: PackItem): Promise<IconContent[]> {
  const filesPath = await getPackFiles(pack.path);

  return Promise.all(
    filesPath.map(async (path) => {
      const worker = await getIconContentPool.proxy<{
        getIconContent: typeof getIconContent;
      }>();
      return worker.getIconContent(path, pack);
    })
  );
}
