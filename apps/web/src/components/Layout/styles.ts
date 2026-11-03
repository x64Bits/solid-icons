import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";
import { HEADER_DEFAULT_HEIGHT } from "../Header/styles";

export const LayoutContainer = styled("div")`
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: auto auto 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Banner Banner"
    "Header Header"
    "Sidebar Content";
  height: 100vh;
  width: 100%;
  max-height: 100vh;
  max-width: 100%;
  overflow: hidden;
  color: ${(props: any) => props.theme?.().colors?.textPrimary};
  background-color: ${(props: any) => props.theme?.().colors?.background};

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

export const BannerLayout = styled("div")`
  grid-area: Banner;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  z-index: 10;
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
  height: 100%;
  overflow-y: auto;
`;
