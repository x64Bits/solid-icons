import { keyframes, styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

const showAnimation = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const PackName = styled("h1")`
  font-weight: 300;
  font-size: 3em;
  text-align: left;
  animation: ${showAnimation} 450ms ease;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      animation: ${showAnimation} 0ms ease;
    }
  }
`;
