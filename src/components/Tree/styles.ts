import styled from "styled-components";

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 1em;
  position: absolute;
  height: 100%;
  min-width: 160px;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #0d0f17;
  z-index: 999;
`;

export const NonWrappableColumn = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`;

interface RouteLinkProps {
  level: number;
}

export const RouteLink = styled.a<RouteLinkProps>`
  color: white;
  margin-bottom: 0.2em;
  overflow-wrap: break-word;
  text-decoration: none;
  margin-left: ${(props) => props.level - 1}em;
`;


export const MissoGatesLogo = styled.h3`
  position: absolute;
  top: -10px;
  left: 10px;
  z-index: 9999;
  white-space: nowrap;
  transition: all 0.3s ease;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
