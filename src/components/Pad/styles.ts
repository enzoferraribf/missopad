import styled from "styled-components";

export const PadHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 99vw;
  height: 3vh;
`;

export const HeaderTitle = styled.h1`
  color: #c9d1d9;

  transition: all 0.3s ease;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const MissoGatesLogo = styled.h3`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 9999;

  transition: all 0.3s ease;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export const PadContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Editor = styled.textarea`
  border: 3px;
  outline: none;
  resize: none;
  width: 50vw;
  height: 96vh;
  overflow-y: scroll;
  white-space: pre-wrap;
  background-color: #0d1117;
  color: #c9d1d9;
  padding: 30px;
`;

export interface PreviewerProps {
  onlyView?: boolean;
}

export const Previewer = styled.div<PreviewerProps>`
  padding: 30px;
  width: ${(props) => (props.onlyView ? "100vw" : "50vw")};
  height: 96vh;
  overflow-y: scroll;
`;
