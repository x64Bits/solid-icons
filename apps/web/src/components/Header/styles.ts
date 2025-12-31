import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

interface IHeaderContainerProps {
  solid: boolean;
}

export const HEADER_DEFAULT_HEIGHT = "55";

export const HeaderContainer = styled("header")<IHeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  background: ${(props) => props.theme().colors.background};
  border: 0px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme().colors.stroke};
  min-height: ${HEADER_DEFAULT_HEIGHT}px;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      padding: 0 1em;
    }
  }
`;

export const HeaderTitle = styled("span")`
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
`;

export const HeaderItemsContainer = styled("div")`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme().colors.accent};

  @media (max-width: ${Breakpoints.sm}) {
    & {
      display: none;
    }
  }
`;

export const HeaderSearchContainer = styled("div")`
  width: 50%;

  @media (max-width: ${Breakpoints.md}) {
    & {
      display: none;
    }
  }
`;

export const MenuButton = styled("button")`
  display: none;
  padding: 0.3em;

  svg {
    height: 30px;
    width: 30px;
  }

  @media (max-width: ${Breakpoints.sm}) {
    & {
      display: flex;
    }
  }

  @media (max-width: ${Breakpoints.md}) {
    & {
      display: flex;
    }
  }
`;
