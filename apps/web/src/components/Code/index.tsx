import {
  createMemo,
  createSignal,
  For,
  JSX,
  lazy,
  Match,
  Show,
  Suspense,
  Switch,
} from "solid-js";
import { BiSolidCopy } from "solid-icons/bi";

import { Box, Row } from "../Common/styles";

import {
  CodeBody,
  CodeCircle,
  CodeFrame,
  CodeHeader,
  CopyContainer,
  TabsRow,
} from "./styles";
import Tab from "./Tab";
import copyToClipboard from "~/utils/copy-to-clipboard";
import { Lang } from "./Highlighter";

export interface CodeSample {
  title?: string;
  content: string;
  icon?: JSX.Element;
}

export interface ICodeProps {
  samples: CodeSample[];
  lang: Lang;
  header?: boolean;
  locs?: boolean;
}

export default function Code(props: ICodeProps) {
  const [activeTab, setActiveTab] = createSignal(0);
  const [copied, setCopied] = createSignal(false);
  const activeSample = createMemo(() => props.samples[activeTab()].content);
  const isMultiline = createMemo(() => {
    const sampleLocs = activeSample().split(/\r\n|\r|\n/).length;

    return sampleLocs >= 2;
  });

  const Highlighter = lazy(() => import("./Highlighter"));

  function handleCopy() {
    const text = activeSample();
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <Box mt="1em">
      <CodeFrame locs={props.locs}>
        <Show when={props.header}>
          <CodeHeader pl="1em">
            <Row justify="space-between">
              <Row items="center">
                <CodeCircle />
                <CodeCircle />
                <CodeCircle />
              </Row>
              <TabsRow items="center">
                <Show when={props.samples.length >= 2}>
                  <For each={props.samples}>
                    {(sample, index) => (
                      <Tab
                        activeTab={activeTab()}
                        index={index()}
                        icon={sample.icon}
                        title={sample.title}
                        onChange={setActiveTab}
                      />
                    )}
                  </For>
                </Show>
              </TabsRow>
            </Row>
          </CodeHeader>
        </Show>
        <CodeBody multiline={isMultiline()}>
          <Suspense>
            <Highlighter lang={props.lang}>{activeSample()}</Highlighter>
          </Suspense>
          <CopyContainer onClick={handleCopy} multiline={isMultiline()}>
            <Switch>
              <Match when={!copied()}>
                <BiSolidCopy size="1.2em" />
              </Match>
              <Match when={copied()}>Copied!</Match>
            </Switch>
          </CopyContainer>
        </CodeBody>
      </CodeFrame>
    </Box>
  );
}
