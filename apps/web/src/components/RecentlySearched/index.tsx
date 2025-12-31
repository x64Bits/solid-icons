import { NavLink } from "@solidjs/router";
import { For, Show } from "solid-js";
import createLocalStorage from "~/hooks/create-local-storage";
import { RecentlySearchedContainer } from "./styles";

export default function RecentlySearched() {
  const [searched] = createLocalStorage<Array<string>>("recentlySearched", []);

  return (
    <RecentlySearchedContainer>
      <Show when={searched.length}>
        <span>Recently searched:</span>{" "}
        <b>
          <For each={searched}>
            {(item, index) => (
              <NavLink href={`/search/${item}`}>
                {item}
                {index() !== searched.length - 1 && ", "}
              </NavLink>
            )}
          </For>
        </b>
      </Show>
    </RecentlySearchedContainer>
  );
}
