import type { JSX } from "solid-js";
export { isServer, mergeProps } from "solid-js/web";

type SVGSVGElementTags = JSX.SVGElementTags["svg"];

export interface IconProps extends SVGSVGElementTags {
  size?: string | number;
  color?: string;
  title?: string;
  style?: JSX.CSSProperties;
}

export declare type IconTypes = (props: IconProps) => JSX.Element;
