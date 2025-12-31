import { FaSolidMoon } from "solid-icons/fa";
import { IoSunny } from "solid-icons/io";
import { Match, Switch, useContext } from "solid-js";
import { AppContext } from "~/store/AppContext";
import { DarkModeContainer, IconToggleContainer } from "./styles";

export default function DarkmodeSwitch() {
  const [state, { toggleDarkMode }] = useContext(AppContext);

  function handleDarkMode() {
    toggleDarkMode(!state.darkMode);
    const el = document.querySelector("#dark-mode-indicator") as HTMLDivElement;
    el.style.animationDuration = "250ms";
  }

  return (
    <DarkModeContainer
      data-testid="dark-mode-container"
      onClick={handleDarkMode}
      darkMode={state.darkMode}
    >
      <IconToggleContainer id="dark-mode-indicator" aria-label="custom">
        <Switch>
          <Match when={state.darkMode}>
            <FaSolidMoon />
          </Match>
          <Match when={!state.darkMode}>
            <IoSunny />
          </Match>
        </Switch>
      </IconToggleContainer>
    </DarkModeContainer>
  );
}
