import { BsSearch } from "solid-icons/bs";
import { CgSpinner } from "solid-icons/cg";
import {
  createEffect,
  createSignal,
  Match,
  onCleanup,
  Switch,
  useContext,
} from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";

import {
  SearchBarContainer,
  SearchIconContainer,
  SearchInput,
  SearchPlaceholderContainer,
  SearchShortcut,
  SearchShortcutText,
} from "./styles";
import createDebounce from "~/hooks/create-debounce";
import { AppContext } from "~/store/AppContext";
import saveSearch from "~/utils/save-search";
import getCommandButton from "~/utils/get-command-button";

interface SearchbarProps {
  initialValue?: string;
  fromHeader?: boolean;
  compact?: boolean;
  autofocus?: boolean;
}

export default function Searchbar(props: SearchbarProps) {
  let inputRef: HTMLInputElement | null = null;
  const navigate = useNavigate();
  const location = useLocation();
  const [typing, setTyping] = createSignal(false);
  const [state, { setVisibleNavbar, setActiveIcon }] = useContext(AppContext);

  function handleNavigate(term: string) {
    setTyping(false);
    saveSearch(term);

    if (state.visibleNavbar || state.activeIcon) {
      setVisibleNavbar(false);
      setActiveIcon(null);
    }

    if (location.pathname.includes("/search/package/")) {
      const pathParts = location.pathname.split("/");
      const shortName = pathParts[3];
      if (shortName) {
        navigate(`/search/package/${shortName}/${term}`);
        return;
      }
    }

    navigate(`/search/${term}`);
  }

  const [trigger, clear] = createDebounce(handleNavigate, 750);

  function focusInput(event: KeyboardEvent) {
    if (!props.fromHeader && state.visibleNavSearch) {
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      inputRef.focus();
    }
  }

  createEffect(() => {
    document.addEventListener("keydown", focusInput);

    onCleanup(() => {
      document.removeEventListener("keydown", focusInput);
    });
  });

  function handleChangeText(event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 2) {
      setTyping(true);
      return trigger(value);
    }

    setTyping(false);

    clear();
  }

  function handleFocus() {
    inputRef.focus();
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const term = inputRef.value;
    handleNavigate(term);
  }

  return (
    <SearchBarContainer onClick={handleFocus}>
      <SearchPlaceholderContainer>
        <SearchIconContainer>
          <BsSearch size={18} />
        </SearchIconContainer>
        <form onSubmit={handleSubmit}>
          <SearchInput
            ref={inputRef}
            placeholder="Search icons"
            onInput={handleChangeText}
            value={props.initialValue}
            compact={props.compact}
            autofocus={props.autofocus}
          />
        </form>
      </SearchPlaceholderContainer>
      <SearchShortcut>
        <Switch>
          <Match when={typing()}>
            <CgSpinner size={24} />
          </Match>
          <Match when={!typing()}>
            <SearchShortcutText>{getCommandButton()} + K</SearchShortcutText>
          </Match>
        </Switch>
      </SearchShortcut>
    </SearchBarContainer>
  );
}
