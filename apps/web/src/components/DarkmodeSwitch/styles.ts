import { styled } from "solid-styled-components";

interface IDarkModeContainer {
  darkMode: boolean;
}

export const DarkModeContainer = styled("button")<IDarkModeContainer>`
  width: 50px;
  height: 18px;
  border: 1px solid ${(props) => props.theme().colors.accent};
  border-radius: ${(props) => props.theme().rounded.full};
  margin-right: 1em;
  position: relative;
  cursor: pointer;

  & > div {
    transform: translateX(${(props) => (props.darkMode ? "25" : "-3")}px);
    animation-name: ${(props) => (props.darkMode ? "on" : "off")}DarkMode;
    animation-timing-function: ease;
  }
`;

export const IconToggleContainer = styled("div")`
  width: 25px;
  height: 25px;
  background-color: ${(props) => props.theme().colors.accent};
  border-radius: ${(props) => props.theme().rounded.full};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme().colors.background};
  top: -4px;
  position: absolute;
  box-shadow: ${(props) => props.theme().shadow.unfocus};

  & svg {
    width: 20px;
    height: 20px;
  }
`;
