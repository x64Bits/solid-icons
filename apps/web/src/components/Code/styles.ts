import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";
import { Box, Row } from "../Common/styles";
import { IBoxProps, IFlexProps } from "../Common/types";

interface TabContainerProps extends IBoxProps {
  active?: boolean;
}

interface ICodeFrameProps {
  locs?: boolean;
}

interface ICopyContainerProps {
  multiline?: boolean;
}

interface ICodeBodyProps {
  multiline?: boolean;
}

const copyMultilineStyles = /*css*/ `
  & {
    position: absolute;
    right: 0.8em;
    bottom: 0.5em;
  }
`;

const locs = /*css*/ `
  & code {
    counter-reset: step;
    counter-increment: step 0;
  }

  & code .line::before {
    content: counter(step);
    counter-increment: step;
    width: 1rem;
    margin-right: 1rem;
    display: inline-block;
    text-align: right;
    color: rgba(115, 138, 148, 0.4);
  }
`;

export const CodeFrame = styled("div")<ICodeFrameProps>`
  background-color: ${(props) => props.theme().colors.background};
  border-radius: ${(props) => props.theme().rounded.small};
  border: 1px solid ${(props) => props.theme().colors.strokeAccent};
  box-shadow: ${(props) => props.theme().shadow.unfocus};
  position: relative;
  overflow: hidden;

  ${(props) => props.locs && locs}
`;

export const CodeCircle = styled("div")`
  width: 10px;
  height: 10px;
  border-radius: ${(props) => props.theme().rounded.full};
  background-color: ${(props) => props.theme().colors.stroke};
  margin: 0.5em 0;
  margin-right: 0.5em;
`;

export const CodeHeader = styled(Box)<IBoxProps>`
  border: 0px;
  border-bottom-color: ${(props) => props.theme().colors.strokeAccent};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin-bottom: 0.2em;
`;

export const CodeBody = styled(Box)<ICodeBodyProps>`
  padding: 1em;
  position: relative;
  min-height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & pre {
    background-color: ${(props) => props.theme().colors.background} !important;
    font-weight: 400;
    overflow: hidden;
    overflow-x: auto;
  }

  & pre::-webkit-scrollbar {
    display: none;
  }

  & pre .line {
    display: block;
    min-height: 0.8em;
    font-size: 16px;
  }

  & pre code .line:first-of-type {
    margin-top: 0;
  }

  @media (max-width: ${Breakpoints.sm}) {
    & pre .line {
      font-size: 18px;
    }
  }
`;

export const CopyContainer = styled("button")<ICopyContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme().colors.backgroundLighter};
  color: ${(props) => props.theme().colors.accent};
  border-radius: 5px;
  padding: 0.5em;
  cursor: pointer;

  ${(props) => props.multiline && copyMultilineStyles}
`;

export const TabContainer = styled("button")<TabContainerProps>`
  display: flex;
  align-items: center;
  border: 0px;
  border-left-color: ${(props) => props.theme().colors.strokeAccent};
  border-left-style: solid;
  font-size: 16px;
  border-left-width: 1px;
  padding: 0 1.4em;
  height: 100%;
  background-color: ${(props) =>
    props.active
      ? props.theme().colors.backgroundLighter
      : props.theme().colors.background};
  color: ${(props) =>
    props.active
      ? props.theme().colors.accent
      : props.theme().colors.textPrimary};
  cursor: pointer;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      width: 100%;
      padding: 0;
      justify-content: center;
    }
  }
`;

export const TabsRow = styled(Row)<IFlexProps>`
  @media (max-width: ${Breakpoints.sm}) {
    & {
      width: 100%;
    }
  }
`;

export const HighlighterContainer = styled("code")`
  max-width: 100%;
  color: ${(props) => props.theme().colors.textPrimary} !important;
`;
