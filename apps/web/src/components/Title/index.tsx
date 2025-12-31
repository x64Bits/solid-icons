import { createEffect } from "solid-js";
import { isServer } from "solid-js/web";

interface ITitleProps {
  children: string;
}

export default function Title(props: ITitleProps) {
  createEffect(() => {
    if (!isServer) {
      document.title = props.children;
    }
  });

  return <></>;
}
