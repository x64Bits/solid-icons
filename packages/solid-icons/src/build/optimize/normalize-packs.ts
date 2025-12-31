import { optimize } from "svgo";
import { svgoConfig } from "./svgo-config";

const hiReplacements = [
  {
    // Stroke `currentColor` by default
    regex: /stroke="none"/gi,
    replace: '<path stroke="currentColor"',
  },
  {
    // Stroke `currentColor` when fill are `none`
    regex: /fill="none"/gi,
    replace: 'fill="none" stroke="currentColor"',
  },
];

const tbReplacements = [
  {
    // Remove stroke attr
    regex: /<path/i,
    replace: '<path stroke="none"',
  },
  {
    // Replace default stroke color
    regex: /stroke="#010202"/gi,
    replace: 'stroke="none"',
  },
];

export function normalizeTb(iconData: string) {
  let normalized = iconData;

  for (let i = 0; i < tbReplacements.length; i++) {
    const element = tbReplacements[i];
    normalized = normalized.replace(element.regex, element.replace);
  }

  return normalized;
}

export function normalizeRi(iconData: string) {
  const regex = /<path/i;
  const replacement = '<path fill="currentColor"';

  return iconData.replace(regex, replacement);
}

export function normalizeOutline(iconData: string) {
  let normalized = iconData;

  for (let i = 0; i < hiReplacements.length; i++) {
    const element = hiReplacements[i];
    normalized = normalized.replace(element.regex, element.replace);
  }

  return normalized;
}

export function normalizeTwoTone(iconData: string, path: string) {
  if (!path.includes("twotone")) {
    return optimize(iconData, svgoConfig).data;
  }

  const baseColorRegex = /fill="#(333)"/gi;
  const baseColorReplacement = 'fill="currentColor"';
  const secondaryColorRegex = /fill="#(E6E6E6|D9D9D9|D8D8D8)"/gi;
  const secondaryColorReplacement = 'fill="currentColor" fill-opacity="0.09"';

  return iconData
    .replace(baseColorRegex, baseColorReplacement)
    .replace(secondaryColorRegex, secondaryColorReplacement);
}
