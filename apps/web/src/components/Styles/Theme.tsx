import { createEffect, createSignal, useContext } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { ThemeProvider } from "solid-styled-components";
import { AppContext } from "~/store/AppContext";

interface IThemeProps {
  children: JSX.Element;
}

const rounded = {
  small: "10px",
  medium: "20px",
  large: "50px",
  full: "999px",
};

const shadow = {
  unfocus: "0px 4px 4px rgba(217, 217, 217, 0.2)",
};

export const light = {
  colors: {
    accent: "#2E49A8",
    background: "#F4F8FF",
    surface: "#D0DAF2",
    surfaceLighter: "#E8EFFF",
    stroke: "#C2D1F6",
    strokeAccent: "#C2D1F6",
    textPrimary: "#00072D",
    backgroundLighter: "#ECF2FF",
    textSecondary: "#ACACAC",
    overlay: "rgba(244, 248, 255, 0.9)",
  },
  rounded,
  shadow,
};

export const dark = {
  colors: {
    accent: "#7D9AC4",
    background: "#0E192E",
    stroke: "#2F3E53",
    strokeAccent: "#6083B5",
    surface: "#0C172A",
    surfaceLighter: "#2C394B",
    textPrimary: "#D0D6DD",
    backgroundLighter: "#14223A",
    textSecondary: "#ACACAC",
    overlay: "rgba(12, 23, 42, 0.9)",
  },
  rounded,
  shadow: {
    unfocus: "0px 0px 0px transparent",
  },
};

export const themes = {
  light,
  dark,
};

export default function Theme(props: IThemeProps) {
  const [theme, setTheme] = createSignal(light);
  const [state] = useContext(AppContext);

  createEffect(() => {
    setTheme(state.darkMode ? dark : light);
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
