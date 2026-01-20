import {
  normalizeOutline,
  normalizeRi,
  normalizeTb,
  normalizeTwoTone,
} from "./normalize-packs";
import { svgoConfig } from "./svgo-config";
import { Output, optimize } from "svgo";
import { NORMALIZE_PACK } from "../constants";

const disablePlugins = (names: string[]) => {
  return {
    ...svgoConfig,
    plugins: svgoConfig.plugins?.filter(
      /** avoid type issue with `svgo` */
      (plugin: any) => !names.includes(plugin.name)
    ),
  };
};

export async function optimizeContents(
  contents: string,
  shortName: string,
  path: string
) {
  let optimizedFile: Output;
  const preserveStrokeConfig = {
    ...svgoConfig,
    plugins: svgoConfig.plugins?.filter((plugin) => {
      if ((plugin as any).name == "removeAttributesBySelector") {
        return false;
      }
      return true;
    }),
  };

  switch (shortName) {
    case NORMALIZE_PACK.TB:
    case NORMALIZE_PACK.FI:
      optimizedFile = optimize(contents, preserveStrokeConfig);
      break;
    case NORMALIZE_PACK.HI:
      if (path.includes("outline")) {
        optimizedFile = optimize(contents, preserveStrokeConfig);
      } else {
        optimizedFile = optimize(contents, svgoConfig);
      }
      break;
    case NORMALIZE_PACK.AI:
      if (path.includes("twotone")) {
        optimizedFile = optimize(contents, disablePlugins(["convertColors"]));
      } else {
        optimizedFile = optimize(contents, svgoConfig);
      }
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
      optimizedFile.data = normalizeTwoTone(optimizedFile.data, path);
      break;
    case NORMALIZE_PACK.RI:
      optimizedFile.data = normalizeRi(optimizedFile.data);
      break;
  }

  return optimizedFile;
}
