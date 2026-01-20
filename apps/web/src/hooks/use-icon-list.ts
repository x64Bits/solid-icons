import { Accessor, createEffect, createSignal } from "solid-js";

type TReturnProps = [Accessor<Array<string>>, Accessor<boolean>];

function getSearchFile() {
  // 1. Construct the full URL to bypass Vite's /public restriction
  const path = `${window.location.origin}/search.js`;

  // 2. Use /* @vite-ignore */ so Vite doesn't try to bundle it
  return import(/* @vite-ignore */ path)
    .then((i) => i.default.icons)
    .catch((err) => {
      console.error("Failed to load search index:", err);
      return []; // Return empty array to prevent app crash
    });
}

export default function useIconList(term: Accessor<string>): TReturnProps {
  const [icons, setIcons] = createSignal<string[]>([]);
  const [loading, setLoading] = createSignal(false);

  createEffect(() => {
    const tVal = term();
    if (!tVal) {
      setIcons([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const termLowerCase = tVal.toLocaleLowerCase();

    getSearchFile().then((data) => {
      const result = data.filter((iconName: string) =>
        iconName.toLowerCase().includes(termLowerCase)
      );
      setIcons(result);
      setLoading(false);
    });
  });

  return [icons, loading];
}

export function usePackageList(
  shortName: Accessor<string>,
  term?: Accessor<string>,
) {
  const [icons, setIcons] = createSignal([]);

  createEffect(() => {
    const sName = shortName();
    const tVal = term ? term() : "";
    
    if (!sName) return;

    const shortNameLowerCase = sName.toLocaleLowerCase();
    const termLowerCase = tVal ? tVal.toLocaleLowerCase() : "";

    getSearchFile().then((data) => {
      const result = data.filter((iconName: string) => {
        const belongsToPack =
          iconName.toLowerCase().substring(0, 2) === shortNameLowerCase;
        if (!belongsToPack) return false;

        if (termLowerCase && !iconName.toLowerCase().includes(termLowerCase)) {
          return false;
        }

        return true;
      });

      setIcons(result);
    });
  });

  return icons;
}
