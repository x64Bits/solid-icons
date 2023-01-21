import fs from "fs-extra";
import { load } from "cheerio";
import { pool } from "workerpool";

import { getPackFiles } from "./get-files";
import { formatFileName } from "./utils/file-name";
import { IconContent, PackItem } from "./types";
import { type optimizeContents } from "./optimize";

export const getFileByPath = (path: string) => fs.readFile(path, "utf8");

const optimizationPool = pool("./src/build/optimize/index.js");

const getIconContent = async (
  path: string,
  pack: PackItem
): Promise<IconContent> => {
  const rawFile = await getFileByPath(path);
  const optimizeFile = await optimizationPool
    .proxy<{ optimizeContents: typeof optimizeContents }>()
    .then((worker) => worker.optimizeContents(rawFile, pack.shortName));

  const $ = load(optimizeFile.data, { xmlMode: true });
  const mountedElement = $("svg");

  const { children, attribs } = mountedElement[0];

  return {
    fileName: formatFileName(path, pack),
    contents: children
      .reduce(
        (prev: string[], current) =>
          current.type === "tag" ? [...prev, $.html(current)] : prev,
        []
      )
      .join(""),
    svgAttribs: attribs,
  };
};

export async function getIcons(pack: PackItem): Promise<IconContent[]> {
  const filesPath = await getPackFiles(pack.path);

  return Promise.all(
    filesPath.map(async (path) => await getIconContent(path, pack))
  );
}
