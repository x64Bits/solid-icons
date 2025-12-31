import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

export const NextIconsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const NextIconsList = styled("div")`
  background-color: ${(props) => props.theme().colors.surfaceLighter};
  border-top: 1px solid ${(props) => props.theme().colors.strokeAccent};
  width: 100%;

  & span {
    font-size: 12px;
  }

  & svg {
    height: 2em;
    width: 2em;
  }
`;

export const NextIconsGrid = styled("div")`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  padding: 1em 2em;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    & button:nth-child(n + 4) {
      display: none;
    }
  }
`;

export const NextIconsLabelContainer = styled("div")`
  background-color: ${(props) => props.theme().colors.surfaceLighter};
  padding: 8px 20px;
  border-top-left-radius: ${(props) => props.theme().rounded.medium};
  border-top-right-radius: ${(props) => props.theme().rounded.medium};
  border: 1px solid ${(props) => props.theme().colors.strokeAccent};
  border-bottom: 0px solid transparent;
  position: relative;

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    bottom: -2px;
    background-color: inherit;
    position: absolute;
    left: 0px;
  }
`;

export const NextIconsLabel = styled("span")`
  font-size: 16px;
`;

export const NextIconContainer = styled("button")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  max-width: 100%;

  & .icon-placeholder {
    min-height: 2em;
  }

  &:hover {
    color: ${(props) => props.theme().colors.accent};
  }
`;
