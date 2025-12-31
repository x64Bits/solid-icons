import { NavLink } from "@solidjs/router";
import { AiFillGithub } from "solid-icons/ai";
import { BiRegularMenu } from "solid-icons/bi";
import { css } from "solid-styled-components";
import { Match, Show, Switch, useContext } from "solid-js";

import {
  HeaderContainer,
  HeaderItemsContainer,
  HeaderSearchContainer,
  HeaderTitle,
  MenuButton,
} from "./styles";
import { AppContext } from "~/store/AppContext";
import Searchbar from "../Searchbar";
import { Row } from "../Common/styles";
import { IoClose } from "solid-icons/io";
import DarkmodeSwitch from "../DarkmodeSwitch";

export default function Header() {
  const [state, { setVisibleNavbar }] = useContext(AppContext);

  function handleToggleNavbar() {
    setVisibleNavbar(!state.visibleNavbar);
  }

  return (
    <HeaderContainer solid={state.visibleNavSearch}>
      <Row justify="center" items="center">
        <MenuButton onClick={handleToggleNavbar}>
          <Switch>
            <Match when={state.visibleNavbar}>
              <IoClose />
            </Match>
            <Match when={!state.visibleNavbar}>
              <BiRegularMenu />
            </Match>
          </Switch>
        </MenuButton>
        <NavLink
          href="/"
          style={css`
            text-decoration: none;
          `}
        >
          <HeaderTitle>Solid Icons</HeaderTitle>
        </NavLink>
      </Row>
      <Show when={state.visibleNavSearch}>
        <HeaderSearchContainer>
          <Searchbar fromHeader={true} compact={true} />
        </HeaderSearchContainer>
      </Show>
      <HeaderItemsContainer>
        <DarkmodeSwitch />
        <a href="https://github.com/x64Bits/solid-icons" target="_blank">
          <AiFillGithub size="30px" />
        </a>
      </HeaderItemsContainer>
    </HeaderContainer>
  );
}
