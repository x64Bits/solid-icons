import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

export const SearchContent = styled("main")`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

export const IconList = styled("section")`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-auto-rows: minmax(min-content, max-content);
  gap: 1em;
  padding: 1em;
  min-width: calc(100% - 1em);

  & button:hover {
    background-color: ${(props) => props.theme().colors.backgroundLighter};
    border-color: ${(props) => props.theme().colors.stroke};
  }

  @media (max-width: ${Breakpoints.sm}) {
    & {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export const VirtualContainer = styled("div")`
  width: 100%;
  position: relative;
  padding: 1em;
  min-width: calc(100% - 1em);

  & button:hover {
    background-color: ${(props) => props.theme().colors.backgroundLighter};
    border-color: ${(props) => props.theme().colors.stroke};
  }
`;

export const SearchResultsContainer = styled("div")`
  width: 100%;
`;
