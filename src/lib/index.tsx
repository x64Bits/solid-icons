import { JSX, splitProps } from "solid-js";
import { isServer, mergeProps, ssr } from "solid-js/web";

type SVGSVGElementTags = JSX.SVGElementTags["svg"];

export interface IconTree {
  a: SVGSVGElementTags;
  c: string;
}

export interface IconProps extends SVGSVGElementTags {
  size?: string | number;
  color?: string;
  title?: string;
  style?: JSX.CSSProperties;
}

export interface IconBaseProps extends IconProps {
  src: IconTree;
}

export declare type IconTypes = (props: IconProps) => JSX.Element;

export const CustomIcon = (props: IconBaseProps) =>
  IconTemplate(props.src, props);

export function IconTemplate(iconSrc: IconTree, props: IconProps): JSX.Element {
  const mergedProps = mergeProps(iconSrc.a, props) as IconBaseProps;
  const [_, svgProps] = splitProps(mergedProps, ["src"]);

  return (
    <svg
      stroke={iconSrc.a.stroke}
      color={props.color || "currentColor"}
      stroke-width="0"
      style={{
        ...props.style,
        overflow: "visible",
      }}
      {...svgProps}
      height={props.size || "1em"}
      width={props.size || "1em"}
      innerHTML={iconSrc.c}
      xmlns="http://www.w3.org/2000/svg"
    >
      {isServer && ssr(iconSrc.c)}
      {props.title && <title>{props.title}</title>}
    </svg>
  );
}
