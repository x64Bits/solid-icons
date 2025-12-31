import { keyframes, styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

interface ISearchInputProps {
  compact: boolean;
}

const showAnimation = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SearchBarContainer = styled("div")`
  display: flex;
  opacity: 1;
  background-color: ${(props) => props.theme().colors.background};
  border-radius: ${(props) => props.theme().rounded.full};
  box-shadow: ${(props) => props.theme().shadow.unfocus};
  border: 1px solid ${(props) => props.theme().colors.stroke};
  color: ${(props) => props.theme().colors.accent};
  animation: ${showAnimation} 250ms ease;
  cursor: text;

  &:focus-within {
    background-color: ${(props) => props.theme().colors.backgroundLighter};
  }
`;

export const SearchPlaceholderContainer = styled("div")`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const SearchIconContainer = styled("div")`
  margin: 0 2px;
  margin-left: 20px;
  margin-right: 10px;
`;

export const SearchInput = styled("input")<ISearchInputProps>`
  width: 100%;
  flex: 1;
  padding: ${(props) => (props.compact ? "8px" : "15px")} 0px;
  font-size: 1.1em;
  color: ${(props) => props.theme().colors.textPrimary};
  font-weight: 300;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme().colors.textPrimary};
    font-weight: 300;
  }
`;

export const SearchShortcut = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-width: 70px;
  margin: 0 10px;
  font-weight: 400;
  color: ${(props) => props.theme().colors.accent};

  & svg {
    animation: ${spinAnimation} 1s linear infinite;
  }
`;

export const SearchShortcutText = styled("span")`
  @media (max-width: ${Breakpoints.md}) {
    & {
      display: none;
    }
  }
`;
