import type { JSX } from "solid-js";

const isServer = typeof window === "undefined";

type SVGSVGElementTags = JSX.SVGElementTags["svg"];

export interface IconTree {
  a: SVGSVGElementTags;
  c: string;
  _t?: DocumentFragment;
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
  props: IconProps
): JSX.Element {
  return (
    <svg
      ref={(node: SVGSVGElement) => {
        if (!isServer && node) {
          if (!iconSrc._t) {
            const template = document.createElement("template");
            template.innerHTML = `<svg>${iconSrc.c}</svg>`;
            const svgChild = template.content.firstChild as SVGSVGElement;
            const frag = document.createDocumentFragment();
            while (svgChild && svgChild.firstChild) {
              frag.appendChild(svgChild.firstChild);
            }
            iconSrc._t = frag;
          }
          if (props.title) {
            const titleEl = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "title"
            );
            titleEl.textContent = props.title;
            node.appendChild(titleEl);
          }
          node.appendChild(iconSrc._t.cloneNode(true));
        }
      }}
      {...iconSrc.a}
      color={props.color || "currentColor"}
      height={props.size || "1em"}
      width={props.size || "1em"}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...(typeof props.style === "object" ? props.style : {}),
        overflow: "visible",
      }}
      innerHTML={
        isServer
          ? props.title
            ? `${iconSrc.c}<title>${props.title}</title>`
            : iconSrc.c
          : undefined
      }
      {...props}
    />
  );
}
