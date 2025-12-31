import { createVirtualizer } from "@tanstack/solid-virtual";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import {
  createEffect,
  createMemo,
  For,
  Show,
  useContext,
  createSignal,
  onMount,
  onCleanup,
} from "solid-js";
import { BsSlashCircleFill } from "solid-icons/bs";
import { useParams } from "@solidjs/router";
import { useTheme } from "solid-styled-components";

import { Box, Flex, Row, Text } from "~/components/Common/styles";
import Icon from "~/components/Icon";
import IconPreview from "~/components/IconPreview";
import IconsSkeleton from "~/components/IconsSkeleton";
import Layout from "~/components/Layout";
import { ContentLayout } from "~/components/Layout/styles";
import Searchbar from "~/components/Searchbar";

import useIconList from "~/hooks/use-icon-list";
import { useIconGridColumns } from "~/hooks/use-icon-grid-columns";
import { AppContext } from "~/store/AppContext";

import { SearchbarContent, SearchbarWrapper } from "../home.styles";
import { IconList, SearchContent, VirtualContainer } from "./term.styles";

export default function SearchRoute() {
  let contentRef: HTMLDivElement | undefined = undefined;
  let searchWrapperRef: HTMLDivElement | undefined = undefined;
  const [listEl, setListEl] = createSignal<HTMLDivElement | undefined>();
  const params = useParams();
  const term = createMemo(() => params.term);
  const [icons, loading] = useIconList(term);
  const [listOffset, setListOffset] = createSignal(0);
  const [containerWidth, setContainerWidth] = createSignal(0);
  const [state, { setVisibleNavSearch }] = useContext(AppContext);
  const useVisibilityObserver = createVisibilityObserver({
    threshold: 0.2,
    initialValue: true,
  });
  const visible = useVisibilityObserver(() => searchWrapperRef);
  const theme = useTheme();

  const columns = useIconGridColumns();

  const rows = createMemo(() => {
    const c = columns();
    const i = icons();
    const res = [];
    for (let idx = 0; idx < i.length; idx += c) {
      res.push(i.slice(idx, idx + c));
    }
    return res;
  });

  const rowHeight = createMemo(() => {
    const width = containerWidth();
    const cols = columns();
    if (width === 0) return 100;
    
    // Assuming 1em = 16px. 
    // Gap: 1em (16px)
    const gap = 16;
    const totalGap = (cols - 1) * gap;
    const availableWidth = width - totalGap;
    const itemSize = availableWidth / cols;
    
    // Row height = item height + bottom padding (gap)
    return itemSize + gap;
  });

  const rowVirtualizer = createVirtualizer({
    get count() {
      return rows().length;
    },
    getScrollElement: () => contentRef,
    estimateSize: () => rowHeight(),
    get scrollMargin() {
      return listOffset();
    },
  });

  createEffect(() => {
    const el = listEl();
    if (el) {
      setListOffset(el.offsetTop);
      
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(el);
      
      onCleanup(() => observer.disconnect());
    }
  });

  createEffect(() => {
    setVisibleNavSearch(!visible());
  });

  return (
    <Layout title={`Search: "${term()}"`}>
      <ContentLayout ref={contentRef}>
        <SearchContent>
          <Box px="1em">
            <SearchbarContent ref={searchWrapperRef}>
              <SearchbarWrapper width="50%">
                <Searchbar initialValue={params.term} />
                <Show when={icons().length}>
                  <Box mt="0.5em" ml="0.5em">
                    <Row justify="flex-start">
                      <Text color="textPrimary" size="1" weight="300">
                        Search Results:{" "}
                        <Text color="textPrimary" weight="bold">
                          {icons().length}
                        </Text>
                      </Text>
                    </Row>
                  </Box>
                </Show>
              </SearchbarWrapper>
            </SearchbarContent>
            <Show when={!loading()} fallback={<IconsSkeleton count={30} />}>
              <Box mt="2em">
                <Row justify="center">
                  <VirtualContainer ref={setListEl}>
                    <Show when={containerWidth() > 0} fallback={<IconsSkeleton count={30} />}>
                      <div
                        style={`height: ${rowVirtualizer.getTotalSize() - listOffset()}px; width: 100%; position: relative;`}
                      >
                        <For each={rowVirtualizer.getVirtualItems()}>
                          {(virtualRow) => (
                            <div
                              data-index={virtualRow.index}
                              ref={rowVirtualizer.measureElement}
                              style={`position: absolute; top: 0; left: 0; width: 100%; transform: translateY(${virtualRow.start - listOffset()}px); display: grid; grid-template-columns: repeat(${columns()}, minmax(0, 1fr)); gap: 1em; padding: 0 0 1em 0;`}
                            >
                              <For each={rows()[virtualRow.index]}>
                                {(icon) => <Icon name={icon} term={params.term} />}
                              </For>
                            </div>
                          )}
                        </For>
                      </div>
                    </Show>
                  </VirtualContainer>
                </Row>
              </Box>
            </Show>
            <Show when={!loading() && !icons().length}>
              <Box>
                <Flex justify="center" direction="column" items="center">
                  <BsSlashCircleFill
                    size="4em"
                    color={theme().colors.strokeAccent}
                  />
                  <Box mt="1.5em">
                    <Text size="2em" weight="300">
                      Your search term does not match any icon
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Show>
          </Box>
        </SearchContent>
      </ContentLayout>
      <Show when={state.activeIcon}>
        <IconPreview icons={icons} term={params.term} />
      </Show>
    </Layout>
  );
}
