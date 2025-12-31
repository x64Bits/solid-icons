import { IColors } from "~/components/Styles/styled";

export interface IBoxProps {
  pl?: string;
  pr?: string;
  pt?: string;
  pb?: string;
  mb?: string;
  mr?: string;
  ml?: string;
  mt?: string;
  mx?: string;
  my?: string;
  px?: string;
  py?: string;
}

export interface IFlexProps {
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  items?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  content?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  direction?: "column" | "row" | "column-reverse" | "row-reverse";
  "sm:justify"?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  "sm:items"?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  "sm:direction"?: "column" | "row" | "column-reverse" | "row-reverse";
}

export type TColors = keyof IColors;

export interface ITextProps {
  size?: string;
  weight?: "normal" | "bold" | "light" | "300" | "400" | "500" | "700";
  color?: TColors;
  align?: "left" | "center" | "right";
}

export interface IPulseView {
  size?: string;
  rounded?: string;
  color?: TColors;
  width?: string;
  height?: string;
}
