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

export function normalizeTb(iconData: string): string {
  let normalized = iconData;

  for (let i = 0; i < tbReplacements.length; i++) {
    const element = tbReplacements[i];
    normalized = normalized.replace(element.regex, element.replace);
  }

  return normalized;
}

export function normalizeRi(iconData: string): string {
  const regex = /<path/i;
  const replacement = '<path fill="currentColor"';

  return iconData.replace(regex, replacement);
}

export function normalizeOutline(iconData: string): string {
  let normalized = iconData;

  for (let i = 0; i < hiReplacements.length; i++) {
    const element = hiReplacements[i];
    normalized = normalized.replace(element.regex, element.replace);
  }

  return normalized;
}

export function normalizeTwoTone(iconData: string, path: string): string {
  if (!path.includes("twotone")) {
    return iconData;
  }

  const regex = /fill="currentColor"/i;
  const replacement = 'fill="currentColor" fill-opacity="0.6"';

  return iconData.replace(regex, replacement);
}
