import { getPackFiles } from "./get-files";
import type { IconContent, PackItem } from "./types";
import type { getIconContent } from "./get-icon";
import { getIconContentPool } from "./index";

export async function getIcons(pack: PackItem): Promise<IconContent[]> {
  const filesPath = await getPackFiles(pack.path);

  const iconContents = await Promise.all(
    filesPath.map(async (path) => {
      const worker = await getIconContentPool.proxy<{
        getIconContent: typeof getIconContent;
      }>();
      const content = await await worker.getIconContent(path, pack);
      return content;
    })
  );

  return iconContents;
}
