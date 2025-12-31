import { Accessor } from "solid-js";
import "solid-styled-components";

export interface IRounded {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface IShadow {
  unfocus: string;
}

export interface IColors {
  accent: string;
  background: string;
  backgroundLighter: string;
  surface: string;
  surfaceLighter: string;
  stroke: string;
  strokeAccent: string;
  textPrimary: string;
  textSecondary: string;
  overlay: string;
}

type Theme = Accessor<{
  colors: IColors;
  rounded: IRounded;
  shadow: IShadow;
}>;

declare module "solid-styled-components" {
  export interface DefaultTheme extends Theme {}
}
