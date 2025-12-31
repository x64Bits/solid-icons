import { For, Show, useContext } from "solid-js";
import { AppContext } from "~/store/AppContext";
import { Box, Row } from "../Common/styles";
import HighlightName from "../HighlightName";
import Glyph from "../Icon/Glyph";
import IconsSkeleton from "../IconsSkeleton";
import {
  NextIconContainer,
  NextIconsContainer,
  NextIconsGrid,
  NextIconsLabel,
  NextIconsLabelContainer,
  NextIconsList,
} from "./styles";

interface NextIconsProps {
  nextIcons: string[];
  term: string;
}

export default function NextIcons(props: NextIconsProps) {
  const [_state, { setActiveIcon }] = useContext(AppContext);

  return (
    <NextIconsContainer>
      <NextIconsLabelContainer>
        <NextIconsLabel>Next icons</NextIconsLabel>
      </NextIconsLabelContainer>
      <NextIconsList>
        <NextIconsGrid>
          <Show
            when={props.nextIcons.length}
            fallback={<IconsSkeleton count={6} />}
          >
            <For each={props.nextIcons}>
              {(icon) => (
                <NextIconContainer onClick={() => setActiveIcon(icon)}>
                  <Box mb="0.5em">
                    <Glyph name={icon} />
                  </Box>
                  <HighlightName name={icon} term={props.term} />
                </NextIconContainer>
              )}
            </For>
          </Show>
        </NextIconsGrid>
      </NextIconsList>
    </NextIconsContainer>
  );
}
