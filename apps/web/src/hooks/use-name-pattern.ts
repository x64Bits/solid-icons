import { createEffect, createSignal } from "solid-js";

function getHighlightName(name: string, pattern: RegExp) {
  if (pattern)
    return name
      .split(pattern)
      .map((part) => (part.match(pattern) ? `<b>${part}</b>` : `${part}`))
      .join("");
  return name;
}

export default function useNamePattern(pattern: RegExp, iconName: string) {
  const [highlight, setHighlight] = createSignal("");

  createEffect(() => {
    const result = getHighlightName(iconName, pattern);

    setHighlight(result);
  });

  return highlight;
}
