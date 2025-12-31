import { keyframes, styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

const showAnimation = keyframes`
  from {
    transform: scale(-50%);
    opacity: 0;
  }

  to {
    transform: scale(100%);
    opacity: 1;
  }
`;

export const PreviewOverlay = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: red;
  z-index: 999;
  background-color: ${(props) => props.theme?.().colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      align-items: flex-start;
      padding-top: 2em;
    }
  }
`;

export const PreviewModal = styled("div")`
  width: 60%;
  background-color: ${(props) => props.theme?.().colors.background};
  border: 1px solid ${(props) => props.theme?.().colors.strokeAccent};
  box-shadow: ${(props) => props.theme?.().shadow.unfocus};
  border-radius: calc(${(props) => props.theme?.().rounded.medium} + 1em);
  overflow: hidden;
  position: relative;
  animation: ${showAnimation} 250ms ease;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      width: 90%;
    }
  }
`;

export const CloseButton = styled("button")`
  background-color: ${(props) => props.theme?.().colors.surfaceLighter};
  color: ${(props) => props.theme?.().colors.textSecondary};
  border: 1px solid ${(props) => props.theme?.().colors.strokeAccent};
  border-top: 0;
  border-right: 0;
  font-size: 1.6em;
  height: 50px;
  width: 55px;
  position: absolute;
  right: 0;
  top: 0;
  border-bottom-left-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreviewContent = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  /* margin-top: 1.5em; */
  padding: 2em;
  padding-bottom: 2em;

  @media (max-width: ${Breakpoints.md}) {
    & {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      padding: 1em;
      margin-top: 3em;
      max-height: 450px;
      overflow-y: auto;
    }
  }
`;

export const PreviewIconContainer = styled("div")`
  width: 100%;
  border: 1px solid ${(props) => props.theme?.().colors.strokeAccent};
  justify-self: center;
  border-radius: 1em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 1em;
  grid-column: span 1 / span 3;

  background-image: linear-gradient(
      0deg,
      ${(props) => props.theme?.().colors.stroke}6e 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${(props) => props.theme?.().colors.stroke}6e 1px,
      transparent 1px
    );
  background-size: 15px 15px;

  & span {
    font-size: 1.2em;
    font-weight: 300;
    word-break: break-all;
    text-align: center;
    margin: 0 2em;
  }

  & svg {
    width: 200px;
    height: 200px;
    border: ${(props) => props.theme?.().colors.textPrimary};
  }

  @media (max-width: ${Breakpoints.md}) {
    & {
      margin-bottom: 1em;
      width: calc(100% - 4em);
    }

    & svg {
      width: 150;
      height: 150px;
    }
  }

  @media (max-width: ${Breakpoints.md}) {
    & {
      margin-bottom: 1em;
      width: 100%;
    }
  }
`;

export const PreviewCopyContainer = styled("div")`
  display: flex;
  flex-direction: column;
  grid-column: span 2 / span 3;
  padding: 0 2em;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      grid-column: span 1 / span 1;
      margin-top: 2em;
      padding: 0;
    }
  }
`;

export const PreviewIconWrapper = styled("div")`
  padding: 1em;
`;
