import { createMemo } from "solid-js";
import useNamePattern from "~/hooks/use-name-pattern";
import { HighlightText } from "./styles";

export interface IHighlightNameProps {
  term: string;
  name: string;
}

function getSplitedName(name: string) {
  if (!name) return "";

  if (name.length >= 25) {
    return `${name.substring(0, 25)}...`;
  }

  return name;
}

export default function HighlightName(props: IHighlightNameProps) {
  const pattern = createMemo(() => new RegExp(`(${props.term})`, "i"));
  const iconName = useNamePattern(pattern(), getSplitedName(props.name));

  return <HighlightText innerHTML={iconName()}></HighlightText>;
}
