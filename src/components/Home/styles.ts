import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 100vw;
`;

export const Title = styled.h1`
  font-size: 8vw;
`;

export const ExplorerForm = styled.form`
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  align-items: baseline;

  label {
    font-size: 3vw;
  }

  input {
    font-size: 3vw;
    width: 20vw;
  }

  a {
    margin-left: 10px;

    font-size: 3vw;
    text-decoration: none;
    transition: all 0.3s ease;

    :hover {
      opacity: 0.7;
    }
  }
`;
