import fs from "fs-extra";
import { load } from "cheerio";
import { worker } from "workerpool";

import { formatFileName } from "./utils/file-name";
import { IconContent, PackItem } from "./types";
import { optimizeContents } from "./optimize";

export const getIconContent = async (
  path: string,
  pack: PackItem
): Promise<IconContent> => {
  const rawFile = await fs.readFile(path, "utf-8");
  const optimizeFile = await optimizeContents(rawFile, pack.shortName);

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

worker({
  getIconContent,
});
