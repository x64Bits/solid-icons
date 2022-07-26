const aiReplacements = [
  {
    name: "stroke",
    regex: /stroke="none"/gi,
    replace: '<path stroke="currentColor"',
  },
  {
    name: "fill",
    regex: /fill="none"/gi,
    replace: 'fill="none" stroke="currentColor"',
  },
];

export function normalizeTb(iconData: string): string {
  const regex = /<path/i;
  const replacement = '<path stroke="none"';

  return iconData.replace(regex, replacement);
}

export function normalizeOutline(iconData: string): string {
  let normalized = iconData;

  for (let i = 0; i < aiReplacements.length; i++) {
    const element = aiReplacements[i];
    normalized = normalized.replace(element.regex, element.replace);
  }

  return normalized;
}

export function normalizeTwoTone(iconData: string): string {
  const regex = /fill="currentColor"/i;
  const replacement = 'fill="currentColor" fill-opacity="0.6"';

  return iconData.replace(regex, replacement);
}
