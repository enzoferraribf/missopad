import styled from "styled-components";

export const PadHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 100vw;
  height: 4vh;

  background-color: #0D1117;
`;

export const HeaderTitle = styled.h1`
  color: #c9d1d9;
  font-size: large;

  transition: all 0.3s ease;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const PadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  background-color: #0d1117;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

export interface PreviewerProps {
  onlyView?: boolean;
}

export const Previewer = styled.div<PreviewerProps>`
  padding: 30px;
  width: ${(props) => (props.onlyView ? "100vw" : "50vw")};
  height: 96vh;
  overflow-y: scroll;

  background-color: #0d1117;

  @media (max-width: 768px) {
    flex-direction: column;
    height: ${(props) => (props.onlyView ? "100vh" : "46vh")};
    width: 100vw;
    border-top: 3px solid #191F29;
  }
`;
