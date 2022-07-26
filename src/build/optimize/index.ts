import {
  normalizeOutline,
  normalizeTb,
  normalizeTwoTone,
} from "./normalize-packs";
import { svgo } from "./svgo";
import { NORMALIZE_PACK } from "../constants";

export async function optimizeContents(contents: string, shortName: string) {
  const optimizedFile = await svgo.optimize(contents);

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
  }

  return optimizedFile;
}
