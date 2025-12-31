import { IoClose } from "solid-icons/io";
import {
  Accessor,
  createMemo,
  createSignal,
  Match,
  Show,
  Switch,
  useContext,
} from "solid-js";
import { AppContext } from "~/store/AppContext";
import copyToClipboard from "~/utils/copy-to-clipboard";
import Code from "../Code";
import {
  Box,
  CopyActionButton,
  CopyActionContainer,
  Row,
  Text,
} from "../Common/styles";
import Glyph from "../Icon/Glyph";
import NextIcons from "../NextIcons";

import {
  CloseButton,
  PreviewContent,
  PreviewCopyContainer,
  PreviewIconContainer,
  PreviewIconWrapper,
  PreviewModal,
  PreviewOverlay,
} from "./styles";
import createKeypress from "~/hooks/create-keypress";

interface IconPreviewProps {
  icons: Accessor<string[]>;
  term: string;
}

const NEXT_ICONS_LIMIT = 6;

const getNextIcons = (icons: string[], active: string) => {
  const iconIndex = icons.indexOf(active) + 1;
  const stopIndex = iconIndex + NEXT_ICONS_LIMIT;
  let resultIcons = [];

  for (let index = iconIndex; index < stopIndex; index++) {
    const element = icons[index];
    if (element) resultIcons.push(element);
  }

  return resultIcons;
};

const getNextIcon = (icons: string[], active: string) => {
  const iconIndex = icons.indexOf(active) + 1;
  return icons[iconIndex];
};

const getPrevIcon = (icons: string[], active: string) => {
  const iconIndex = icons.indexOf(active) - 1;
  return icons[iconIndex];
};

function getSvg() {
  const svgParent = document.querySelector(
    "#preview-container svg"
  ) as SVGAElement;
  const svgOutput = svgParent.outerHTML;
  return svgOutput;
}

function getJSX(svgContent: string, iconName: string) {
  return /*javascript*/ `export default function ${iconName}(props) {
    return (
      ${svgContent}
    );
  }
  `;
}

export default function IconPreview(props: IconPreviewProps) {
  const [state, { setActiveIcon }] = useContext(AppContext);
  const [copied, setCopied] = createSignal<string>();
  const packageShortName = createMemo(
    () => state.activeIcon && state.activeIcon.substring(0, 2).toLowerCase()
  );
  const nextIcons = createMemo(() =>
    getNextIcons(props.icons(), state.activeIcon || "")
  );
  createKeypress(["Escape", "Esc"], () => setActiveIcon(null));
  createKeypress(["Left", "ArrowLeft"], () =>
    setActiveIcon(getPrevIcon(props.icons(), state.activeIcon || ""))
  );
  createKeypress(["Right", "ArrowRight"], () =>
    setActiveIcon(getNextIcon(props.icons(), state.activeIcon || ""))
  );

  const importSamples = createMemo(() => [
    {
      content: `import { ${
        state.activeIcon
      } } from 'solid-icons/${packageShortName()}'`,
    },
  ]);

  const jsxSample = createMemo(() => [
    {
      content: `<${state.activeIcon} />`,
    },
  ]);

  const handleModalClick = (e: MouseEvent) => e.stopPropagation();

  function handleClose() {
    setActiveIcon(null);
  }

  const onCopied = (type: string) =>
    setCopied(type) && setTimeout(() => setCopied(), 2500);

  function onCopySVG() {
    copyToClipboard(getSvg());
    onCopied("svg");
  }

  function onCopyJSX() {
    const JSX = getJSX(getSvg(), state.activeIcon || "");
    copyToClipboard(JSX);
    onCopied("jsx");
  }

  return (
    <PreviewOverlay onClick={handleClose}>
      <PreviewModal onClick={handleModalClick}>
        <CloseButton onClick={handleClose}>
          <IoClose />
        </CloseButton>
        <PreviewContent>
          <PreviewIconContainer id="preview-container">
            <Text weight="500">{state.activeIcon}</Text>
            <PreviewIconWrapper>
              <Glyph name={state.activeIcon || ""} />
            </PreviewIconWrapper>
          </PreviewIconContainer>
          <PreviewCopyContainer>
            <Text>Import icon from library</Text>
            <Code samples={importSamples()} lang="jsx" />
            <Box mt="1em">
              <Text>Render the icon</Text>
              <Code samples={jsxSample()} lang="jsx" />
            </Box>
            <Box mt="1em">
              <Box mb="1em">
                <Text>Use without the library</Text>
              </Box>
              <CopyActionContainer>
                <CopyActionButton onClick={onCopyJSX}>
                  <Switch fallback="JSX">
                    <Match when={copied() === "jsx"}>Copied!</Match>
                  </Switch>
                </CopyActionButton>
                <CopyActionButton onClick={onCopySVG}>
                  <Switch fallback="SVG">
                    <Match when={copied() === "svg"}>Copied!</Match>
                  </Switch>
                </CopyActionButton>
              </CopyActionContainer>
            </Box>
          </PreviewCopyContainer>
        </PreviewContent>
        <Show when={nextIcons().length}>
          <NextIcons nextIcons={nextIcons()} term={props.term} />
        </Show>
      </PreviewModal>
    </PreviewOverlay>
  );
}
