import { styled } from "solid-styled-components";
import { PulseView } from "../Common/styles";
import { IPulseView } from "../Common/types";

export const IconContainer = styled("button")`
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: ${(props) => props.theme?.().rounded.small};
  border: 1px solid;
  border-color: transparent;
  padding: 0.5em;
  color: ${(props) => props.theme?.().colors.textPrimary};
  cursor: pointer;

  & span {
    margin-top: 0.8em;
    display: block;
  }

  & b {
    font-weight: bold;
  }

  & svg {
    width: 2.8em;
    height: 2.8em;
  }
`;

export const IconPlaceholder = styled(PulseView)<IPulseView>`
  color: ${(props) => props.color || props.theme?.().colors.surface};
  margin: 0 auto;
  border-radius: 6px;
`;
