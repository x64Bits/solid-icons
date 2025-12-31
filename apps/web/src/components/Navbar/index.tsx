import { NavLink } from "@solidjs/router";
import { AiFillGithub } from "solid-icons/ai";
import { createEffect, createSignal, For, Show, useContext } from "solid-js";
import { AppContext } from "~/store/AppContext";
import getMetaFile, { MetaFile } from "~/utils/get-meta-file";
import { Box, Row } from "../Common/styles";
import DarkmodeSwitch from "../DarkmodeSwitch";
import Searchbar from "../Searchbar";
import {
  NavbarContainer,
  NavbarItemsContainer,
  NavbarOverlay,
  NavbarTitle,
  NavItem,
  NavItemButton,
} from "./styles";

interface INavbarProps {
  activePackage?: string;
}

export default function Navbar(props: INavbarProps) {
  const [metadata, setMetadata] = createSignal<MetaFile[]>([]);
  const [state, { setVisibleNavbar }] = useContext(AppContext);

  createEffect(async () => {
    const metaFile = await getMetaFile();
    const sorted =
      metaFile.sort((a, b) => a.packName.localeCompare(b.packName)) || [];
    setMetadata(sorted);
  });

  function handleCloseNavbar() {
    setVisibleNavbar(false);
  }

  return (
    <>
      <NavbarContainer visible={state.visibleNavbar}>
        <Show when={state.visibleNavbar}>
          <Row justify="flex-end">
            <Box mx="0.5em" mb="0.5em">
              <NavbarItemsContainer>
                <DarkmodeSwitch />
                <a
                  href="https://github.com/x64Bits/solid-icons"
                  target="_blank"
                >
                  <AiFillGithub size="30px" />
                </a>
              </NavbarItemsContainer>
            </Box>
          </Row>
          <Row>
            <Box mx="0.5em">
              <Searchbar compact={true} />
            </Box>
          </Row>
        </Show>
        <NavbarTitle>Collections</NavbarTitle>
        <For each={metadata()}>
          {(item) => (
            <NavLink href={`/search/package/${item.shortName}`}>
              <NavItem onClick={handleCloseNavbar}>
                <NavItemButton active={item.shortName === props.activePackage}>
                  <span>{item.packName}</span>
                  <span>{item.count}</span>
                </NavItemButton>
              </NavItem>
            </NavLink>
          )}
        </For>
      </NavbarContainer>
      <Show when={state.visibleNavbar}>
        <NavbarOverlay onClick={handleCloseNavbar} />
      </Show>
    </>
  );
}
