import { DefaultTheme, styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";
import { HEADER_DEFAULT_HEIGHT } from "../Header/styles";

interface INavbarContainerProps {
  visible: boolean;
}

interface INavItemProps {
  active?: boolean;
}

const responsiveNavbar = (props: DefaultTheme) => /*css*/ `
  @media (max-width: ${Breakpoints.sm}) {
    & {
      width: 80vw;
      z-index: 2;
      max-height: calc(97vh - ${HEADER_DEFAULT_HEIGHT}px);
      background-color: ${props().colors.surface};
      overflow-y: auto;
      position: absolute;
    }
  }

  @media (min-width: ${Breakpoints.md}) {
    & {
      width: 40vw;
      position: absolute;
      background-color: ${props().colors.surface};
      z-index: 2;
      max-height: calc(97vh - ${HEADER_DEFAULT_HEIGHT}px);
      overflow-y: auto;
    }
  }
`;

export const NavbarContainer = styled("nav")<INavbarContainerProps>`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.4em;
  position: relative;
  color: ${(props) => props.theme().colors.textPrimary};
  border: 0px;
  border-right: 1px solid ${(props) => props.theme().colors.stroke};
  min-height: 100%;

  ${(props) => props.visible && responsiveNavbar(props.theme)};
`;

export const NavbarOverlay = styled("div")`
  position: absolute;
  background-color: rgb(14 25 46 / 20%);
  backdrop-filter: blur(8px);
  width: 100vw;
  height: calc(100vh - ${HEADER_DEFAULT_HEIGHT}px);
  top: 65px;
  left: 0;
  right: 0;
  z-index: -2;

  @media (min-width: ${Breakpoints.lg}) {
    & {
      display: none;
    }
  }
`;

export const NavbarTitle = styled("span")`
  font-weight: 300;
  padding: 20px 20px;
`;

export const NavItem = styled("div")`
  display: flex;
  width: 100%;
  margin: 3px 0px;
  font-size: 0.7em;
`;

export const NavItemButton = styled("button")<INavItemProps>`
  font-size: 1.1em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 13px 18px;
  margin: 0 10px;
  border-radius: ${(props) => props.theme().rounded.full};
  color: ${(props) => props.theme().colors.textPrimary};
  background-color: ${(props) =>
    props.active ? props.theme().colors.backgroundLighter : "transparent"};
  color: ${(props) => (props.active ? props.theme().colors.accent : "inherit")};
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme().colors.backgroundLighter};
    color: ${(props) => props.theme().colors.accent};
  }
`;

export const NavbarItemsContainer = styled("div")`
  display: none;
  align-items: center;
  justify-content: flex-end;
  color: ${(props) => props.theme().colors.accent};

  @media (max-width: ${Breakpoints.sm}) {
    & {
      display: flex;
    }
  }
`;
