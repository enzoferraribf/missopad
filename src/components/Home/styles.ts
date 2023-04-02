import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #0D1117;
`;

export const Title = styled.h1`
margin-top: -2rem;
  font-size: 8vw;
`;

export const ExplorerForm = styled.form`
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  align-items: baseline;

  label {
    font-size: 2vw;
  }

  input {
    font-size: 2vw;
    width: 20vw;

    background-color: transparent;
    border: none;
    color: white;

    outline: none;
  }

  a {
    margin-left: 10px;

    font-size: 2vw;
    text-decoration: none;
    transition: all 0.3s ease;

    :hover {
      opacity: 0.7;
    }
  }
`;
