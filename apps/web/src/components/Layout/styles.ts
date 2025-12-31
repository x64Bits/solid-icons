import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";
import { HEADER_DEFAULT_HEIGHT } from "../Header/styles";

export const LayoutContainer = styled("div")`
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: 0.15fr 1.85fr;
  gap: 0px 0px;
  grid-template-areas:
    "Header Header"
    "Sidebar Content";
  max-height: 100vh;
  color: ${(props) => props.theme().colors.textPrimary};
  background-color: ${(props) => props.theme().colors.background};

  @media (max-width: ${Breakpoints.sm}) {
    & {
      grid-template-columns: 0fr 1.6fr;
    }
  }

  @media (max-width: ${Breakpoints.md}) {
    & {
      grid-template-columns: 0fr 1.6fr;
    }
  }

  @media (min-width: ${Breakpoints.md}) {
    & {
      grid-template-columns: 0.2fr 0.8fr;
    }
  }
`;

export const HeaderLayout = styled("div")`
  grid-area: Header;
  max-height: fit-content;
  z-index: 2;
  background-color: transparent;
`;

export const NavbarLayout = styled("div")`
  grid-area: Sidebar;
  overflow-y: auto;
  z-index: 2;
`;

export const ContentLayout = styled("div")`
  grid-area: Content;
  max-height: calc(100vh - ${HEADER_DEFAULT_HEIGHT}px);
  overflow-y: auto;
`;
