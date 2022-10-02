import styled from "styled-components";

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3em 1em;
  position: absolute;
  height: 100%;
  top: 0;
  width: 30%;
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
