import { keyframes, styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";
import { IBoxProps, IFlexProps, IPulseView, ITextProps } from "./types";

const pulseAnimation = keyframes`
  50% {
    opacity: 0.4; 
  }
`;

export const Box = styled("div")<IBoxProps>`
  margin: ${(props) => props.my || "0px"} ${(props) => props.mx || "0px"};
  padding: ${(props) => props.py || "0px"} ${(props) => props.px || "0px"};
  padding-left: ${(props) => props.pl || props.px || "initial"};
  padding-right: ${(props) => props.pr || props.px || "initial"};
  padding-top: ${(props) => props.pt || props.py || "initial"};
  padding-bottom: ${(props) => props.pb || props.py || "initial"};
  margin-bottom: ${(props) => props.mb || props.my || "initial"};
  margin-right: ${(props) => props.mr || props.mx || "initial"};
  margin-left: ${(props) => props.ml || props.mx || "initial"};
  margin-top: ${(props) => props.mt || props.my || "initial"};
`;

export const Text = styled("span")<ITextProps>`
  font-weight: ${(props) => props.weight || "400"};
  font-size: ${(props) => props.size || "16px"};
  color: ${(props) =>
    props.theme?.().colors[props.color] || props.theme?.().colors.textPrimary};
  text-align: ${(props) => props.align || "left"};

  & b {
    font-weight: 600;
  }
`;

export const Flex = styled("div")<IFlexProps>`
  display: flex;
  justify-content: ${(props) => props.justify || "initial"};
  align-items: ${(props) => props.items || "initial"};
  align-content: ${(props) => props.content || "initial"};
  flex-wrap: ${(props) => props.wrap || "initial"};
  flex-direction: ${(props) => props.direction || "initial"};

  @media (max-width: ${Breakpoints.sm}) {
    & {
      justify-content: ${(props) =>
        props["sm:justify"] || props.justify || "unset"};
      align-items: ${(props) => props["sm:items"] || props.items || "unset"};
      flex-direction: ${(props) =>
        props["sm:direction"] || props.direction || "unset"};
    }
  }
`;

export const Col = styled(Flex)<IFlexProps>`
  flex-direction: column;
`;

export const Row = styled(Flex)<IFlexProps>`
  flex-direction: row;
`;

export const PulseView = styled("div")<IPulseView>`
  height: ${(props) => props.size || props.height || "1em"};
  width: ${(props) => props.size || props.width || "1em"};
  border-radius: ${(props) => props.rounded || "0"};
  animation: ${pulseAnimation} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background-color: ${(props) =>
    props.theme().colors[props.color] || props.theme().colors.surface};
`;

export const CopyActionContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 1em;
  font-size: 16px;
`;

export const CopyActionButton = styled("button")`
  width: 100%;
  background-color: ${(props) => props.theme().colors.backgroundLighter};
  color: ${(props) => props.theme().colors.accent};
  padding: 1em 0;
  border-radius: ${(props) => props.theme().rounded.small};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme().colors.textPrimary};
    background-color: ${(props) => props.theme().colors.surfaceLighter};
  }
`;
