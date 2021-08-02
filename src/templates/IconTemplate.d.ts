import { JSX } from "solid-js";

export interface IconTree {
  a: {
    [key: string]: string;
  };
  c: string;
}

export interface IconBaseProps extends JSX.SvgSVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
  title?: string;
}
export declare type IconType = (props: IconBaseProps) => JSX.Element;
