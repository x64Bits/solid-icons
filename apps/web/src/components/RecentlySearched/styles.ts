import { styled } from "solid-styled-components";

export const RecentlySearchedContainer = styled("div")`
  display: flex;
  flex-direction: row;
  margin-left: 0.5em;
  margin-top: 0.5em;
  font-weight: 300;

  & b {
    font-weight: 700;
    margin-left: 0.2em;
    cursor: pointer;
  }

  & span {
    white-space: pre;
  }
`;
