import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import { createEffect, createSignal, Show, useContext } from "solid-js";
import { Flex, PulseView } from "../Common/styles";
import { HighlighterContainer } from "./styles";
import { AppContext } from "~/store/AppContext";

export type Lang = "jsx" | "bash";

interface IHighlighterProps {
  children: string;
  lang: Lang;
}

const getCode = (code: string, lang: Lang) => {
  const formatCode = Prism.highlight(code, Prism.languages[lang], lang);

  setTimeout(() => Prism.highlightAll(), 0);

  return formatCode;
};

export default function Highlighter(props: IHighlighterProps) {
  const [html, setHtml] = createSignal<string>();
  const [state] = useContext(AppContext);

  createEffect((prev) => {
    if (props.children !== prev) {
      const result = getCode(props.children, props.lang);
      setHtml(result);
    }

    return props.children;
  });

  return (
    <>
      <Show
        when={html()}
        fallback={
          <Flex>
            <PulseView height="18px" width="100%" rounded="4px" />
          </Flex>
        }
      >
        <pre>
          <HighlighterContainer
            class={`language-${props.lang} ${
              state.darkMode ? "dark" : "light"
            }`}
            innerHTML={html()}
          />
        </pre>
      </Show>
    </>
  );
}
