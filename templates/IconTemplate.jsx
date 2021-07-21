export default function IconTemplate(props) {
  const { src, attr, size, title, color, ...svgProps } = props;
  const computedSize = size || "1em";

  const trimmedEl = src.c.trim();

  let className;
  if (props.className)
    className = (className ? className + " " : "") + props.className;

  let innerAttr = attr || {};
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
        color: props.color,
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
