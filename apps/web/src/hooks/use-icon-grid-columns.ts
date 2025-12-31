import { createSignal, createEffect, onCleanup } from "solid-js";
import { Breakpoints } from "~/constants/breakpoints";

export function useIconGridColumns() {
  const [columns, setColumns] = createSignal(8);

  createEffect(() => {
    // Breakpoints.sm is "640px", but we need to match the styled-components query
    // The styles use: @media (max-width: ${Breakpoints.sm})
    const mediaQuery = window.matchMedia(`(max-width: ${Breakpoints.sm})`);

    const updateColumns = (e: MediaQueryListEvent | MediaQueryList) => {
      setColumns(e.matches ? 2 : 8);
    };

    // Initial check
    updateColumns(mediaQuery);

    const listener = (e: MediaQueryListEvent) => updateColumns(e);
    mediaQuery.addEventListener("change", listener);

    onCleanup(() => {
      mediaQuery.removeEventListener("change", listener);
    });
  });

  return columns;
}
