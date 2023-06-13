import {
  normalizeOutline,
  normalizeRi,
  normalizeTb,
  normalizeTwoTone,
} from "./normalize-packs";
import { svgoConfig } from "./svgo-config";
import { Output, optimize } from "svgo";
import { NORMALIZE_PACK } from "../constants";

export async function optimizeContents(contents: string, shortName: string) {
  let optimizedFile: Output;
  switch (shortName) {
    case NORMALIZE_PACK.TB:
      const tbSvgoConfig = {
        ...svgoConfig,
        plugins: svgoConfig.plugins?.filter((plugin) => {
          if ((plugin as any).name == "removeAttributesBySelector") {
            return false;
          }
        }),
      };
      optimizedFile = optimize(contents, tbSvgoConfig);
      break;
    default:
      optimizedFile = optimize(contents, svgoConfig);
      break;
  }

  switch (shortName) {
    case NORMALIZE_PACK.IO:
      optimizedFile.data = normalizeOutline(optimizedFile.data);
      break;
    case NORMALIZE_PACK.TB:
      optimizedFile.data = normalizeTb(optimizedFile.data);
      break;
    case NORMALIZE_PACK.HI:
      optimizedFile.data = normalizeOutline(optimizedFile.data);
      break;
    case NORMALIZE_PACK.AI:
      optimizedFile.data = normalizeTwoTone(optimizedFile.data);
      break;
    case NORMALIZE_PACK.RI:
      optimizedFile.data = normalizeRi(optimizedFile.data);
      break;
  }

  return optimizedFile;
}
