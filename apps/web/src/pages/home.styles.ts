import { styled } from "solid-styled-components";
import { Breakpoints } from "~/constants/breakpoints";

interface ISearchbarWrapperProps {
  width?: string;
}

export const ContentMain = styled("main")`
  display: flex;
  width: 100%;
  max-width: 100%;
  position: relative;
  margin-bottom: 3rem;
`;

export const ContentContainer = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10vh;
  font-weight: 700;
  flex-direction: column;
  padding: 0 100px;
  z-index: 1;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      padding: 0;
      margin-top: 2em;
      max-width: 100vw;
    }
  }
`;

export const ContentTitle = styled("h1")`
  font-size: 2.5em;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const ContentDescription = styled("p")`
  font-weight: 400;
  font-size: 1.4em;
  margin-top: 1em;
  text-align: center;

  & b {
    font-weight: 700;
  }

  @media (max-width: ${Breakpoints.sm}) {
    & {
      line-height: 1.3em;
    }
  }
`;

export const GradientContainer = styled("div")`
  position: absolute;
  max-width: 100%;
`;

export const SearchbarContent = styled("div")`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5em;

  @media (max-width: ${Breakpoints.sm}) {
    & {
      margin-top: 0;
    }
  }
`;

export const SearchbarWrapper = styled("div")<ISearchbarWrapperProps>`
  margin-top: 3em;
  width: ${(props) => props.width || "70%"};

  @media (max-width: ${Breakpoints.sm}) {
    & {
      width: 100%;
    }
  }
`;

export const InformationBox = styled("div")`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 28px;
  color: ${(props) => props.theme().colors.textPrimary};
  backdrop-filter: blur(12px);
  font-size: 13px;
  font-weight: 500;
  line-height: 28px;
  white-space-collapse: collapse;
  text-wrap: nowrap;
  padding: 0px 12px;
  background: ${(props) => props.theme().colors.backgroundLighter};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme().colors.stroke};
  border-image: initial;
  border-radius: 7px;
  transition: background 260ms ease 0s, width;

  &:hover {
    background: ${(props) => props.theme().colors.surfaceLighter};
    cursor: pointer;
  }

  b {
    font-weight: 800;
    margin: 0 0.1em;
  }
`;
