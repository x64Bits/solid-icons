import path from "path";
import { ROOT_PATH, tinyStyles } from "../constants";
import { PackItem } from "../types";
import { normalizeName } from "./normalize-name";

function removeExtension(fileName: string) {
  return fileName.split(".")[0];
}

function getStyle(packPath: string, splitPath: string[]): string {
  const removeFileName = splitPath.slice(0, -1).join("/");
  const absolutePath = path.resolve(ROOT_PATH, packPath).replaceAll("\\", "/");

  if (removeFileName !== absolutePath) {
    const styleName = capitalizeFirstLetter(
      removeFileName.split("/").splice(0).pop()
    );
    return tinyStyles[styleName] || styleName;
  }
  return "";
}

function capitalizeFirstLetter(name?: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function clearAndUpper(fileName: string): string {
  return fileName.replace(/-/, "").toUpperCase();
}

export function toPascalCase(fileName: string): string {
  return fileName.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function formatFileName(filePath: string, packInfo: PackItem) {
  const splittedPath = filePath.replaceAll("\\", "/").split("/");
  const name = normalizeName(
    splittedPath[splittedPath.length - 1],
    packInfo.shortName
  );
  const appendStyle = getStyle(packInfo.path, splittedPath).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const rawFileName = removeExtension(name);

  const nameTemplate = `${capitalizeFirstLetter(
    packInfo.shortName
  )}${toPascalCase(appendStyle)}${toPascalCase(rawFileName)}`;

  return nameTemplate;
}
