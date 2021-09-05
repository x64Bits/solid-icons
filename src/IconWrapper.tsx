import { JSX, splitProps } from "solid-js";

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
  const [split, rest] = splitProps(props, ["src"]);

  return (
    <svg
      stroke={split.src.a.stroke}
      fill="currentColor"
      strokeWidth="0"
      {...rest}
      className={rest.className}
      {...split.src.a}
      style={{
        overflow: "visible",
        color: rest.color,
        ...rest.style,
      }}
      height={rest.size || "1em"}
      width={rest.size || "1em"}
      innerHTML={split.src.c}
      xmlns="http://www.w3.org/2000/svg"
    >
      {rest.title && <title>{rest.title}</title>}
    </svg>
  );
}
