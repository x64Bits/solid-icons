import fs from "fs";
import { load } from "cheerio";

import { getPackFiles } from "./get-files";
import { formatFileName } from "./utils/file-name";
import { optimizeContents } from "./optimize/index";
import { IconContent, PackItem } from "./types";

export const getFileByPath = (path: string) => fs.readFileSync(path, "utf8");

const getIconContent = async (
  path: string,
  pack: PackItem
): Promise<IconContent> => {
  const rawFile = getFileByPath(path);
  const optimizeFile = await optimizeContents(rawFile, pack.shortName, path);

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

export function getIcons(pack: PackItem): Promise<IconContent[]> {
  const filesPath = getPackFiles(pack.path);

  return Promise.all(
    filesPath.map(async (path) => await getIconContent(path, pack))
  ).then((contents) => contents.filter((icon) => !!icon.contents.length));
}
