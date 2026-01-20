import type { JSX } from "solid-js";

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

export const CustomIcon = (props: IconBaseProps) => {
  return IconTemplate(props.src, props);
};

export function IconTemplate(
  iconSrc: IconTree,
  props: IconBaseProps
): JSX.Element {
  return (
    <svg
      {...iconSrc.a}
      {...props}
      color={props.color || "currentColor"}
      height={props.size || "1em"}
      width={props.size || "1em"}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...(typeof props.style === "object" ? props.style : {}),
        overflow: "visible",
      }}
      innerHTML={
        props.title ? `${iconSrc.c}<title>${props.title}</title>` : iconSrc.c
      }
      // @ts-ignore
      src={undefined}
    />
  );
}
