import { JSX } from "solid-js";

export interface IconTree {
  a: {
    [key: string]: string;
  };
  c: string;
}

export interface IconBaseProps extends JSX.SvgSVGAttributes<SVGElement> {
  src: IconTree;
  size?: string | number;
  color?: string;
  title?: string;
}

export default function IconTemplate(props: IconBaseProps): JSX.Element {
  const { src, size, title, color, ...svgProps } = props;
  const computedSize = size || "1em";

  const trimmedEl = src.c.trim();

  let className;
  if (props.className)
    className = (className ? className + " " : "") + props.className;

  let innerAttr = {
    stroke: "#000",
    fill: "#000",
  };
  if (color) {
    if (src.a.stroke !== "none") {
      innerAttr.stroke = color;
    }
    if (src.a.fill !== "none") {
      innerAttr.fill = color;
    }
  }

  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      {...innerAttr}
      {...svgProps}
      className={className}
      style={{
        overflow: "visible",
        color: color,
        ...props.style,
      }}
      height={computedSize}
      width={computedSize}
      innerHTML={trimmedEl}
      xmlns="http://www.w3.org/2000/svg"
      {...src.a}
    >
      {title && <title>{title}</title>}
    </svg>
  );
}
