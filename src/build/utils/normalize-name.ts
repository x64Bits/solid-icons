import { NORMALIZE_FILE_NAME } from "../constants";

export function normalizeName(fileName: string, shortName: string) {
  switch (shortName) {
    case NORMALIZE_FILE_NAME.WI:
      return fileName.slice(2);

    case NORMALIZE_FILE_NAME.IM:
      return fileName.slice(3);

    case NORMALIZE_FILE_NAME.BI:
      return fileName.slice(3);

    case NORMALIZE_FILE_NAME.OC:
      return fileName
        .replace(/12/g, "")
        .replace(/16/g, "2")
        .replace(/24/g, "3")
        .replace(/-/g, "");

    default:
      return fileName;
  }
}
