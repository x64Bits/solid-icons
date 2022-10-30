import type { JSX } from "solid-js";
import { isServer, mergeProps } from "solid-js/web";

export interface IconTree {
  a: JSX.SvgSVGAttributes<SVGSVGElement>;
  c: string;
}

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  size?: string | number;
  color?: string;
  title?: string;
  style?: JSX.CSSProperties;
}

export interface IconBaseProps extends IconProps {
  src: IconTree;
}

export declare type IconTypes = (props: IconProps) => JSX.Element;

export function IconTemplate(iconSrc: IconTree, props: IconProps): JSX.Element {
  const mergedProps = mergeProps(iconSrc.a, props);

  return (
    <svg
      stroke={iconSrc.a.stroke}
      fill="currentColor"
      stroke-width="0"
      style={{
        ...props.style,
        overflow: "visible",
        color: props.color || "currentColor",
      }}
      {...mergedProps}
      height={props.size || "1em"}
      width={props.size || "1em"}
      innerHTML={iconSrc.c}
      xmlns="http://www.w3.org/2000/svg"
    >
      {isServer && iconSrc.c}
      {props.title && <title>{props.title}</title>}
    </svg>
  );
}
