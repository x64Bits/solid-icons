import { JSX } from "solid-js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      svg: {
        className?: string;
        style?: object;
        height?: number | string;
        width?: number | string;
        innerHTML: string;
        xmlns: string;
        strokeWidth?: string;
        viewBox?: string;
      };
      title: any;
    }
  }
}

interface ViewBoxTypes {
  bi?: string;
  vsc?: string;
}

const viewBoxes: ViewBoxTypes = {
  bi: "0 0 24 24",
  vsc: "0 0 16 16",
};

export interface IconTree {
  a: {
    [key: string]: string;
  };
  c: string;
  p: string;
}

export interface IconProps extends JSX.SvgSVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
  title?: string;
  style?: object;
  className?: string;
}

export interface IconBaseProps extends IconProps {
  src: IconTree;
}

export declare type IconTypes = (props: IconProps) => JSX.Element;

export default function IconTemplate(props: IconBaseProps): JSX.Element {
  const { src, size, title, color, ...svgProps } = props;
  const computedSize = size || "1em";

  const trimmedEl = src.c.trim();

  const withStroke = src.a.stroke && src.a.stroke !== "none";

  return (
    <svg
      stroke={withStroke ? "currentColor" : "none"}
      fill="currentColor"
      strokeWidth="0"
      {...svgProps}
      className={props.className}
      {...src.a}
      style={{
        overflow: "visible",
        color: color,
        ...props.style,
      }}
      height={computedSize}
      width={computedSize}
      innerHTML={trimmedEl}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
    </svg>
  );
}
