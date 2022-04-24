import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataSnapshot, get, ref } from "firebase/database";

import { db } from "services/firebase";

import { DrawerContainer, NonWrappableColumn, RouteLink } from "./styles";

const ROOT_SYMBOL = ".\\";
const CHILD_SYMBOL = "↳ ";

function Tree() {
  const { pathname } = useLocation();

  const [routes, setRoutes] = useState<DataSnapshot[]>([]);

  useEffect(() => {
    const dbRef = ref(db, pathname);

    async function handleRoutes() {
      const routes = await get(dbRef);

      setRoutes(getDataSnapshotArray(routes));
    }

    handleRoutes();
  }, [pathname]);

  function getDataSnapshotArray(node: DataSnapshot): DataSnapshot[] {
    const children: DataSnapshot[] = [];

    node.forEach((child) => {
      if (child.size > 0) {
        children.push(child);
      }
    });

    return children;
  }

  function getTree() {
    return routes
      .filter(({ size }) => size > 0)
      .map((route) => (
        <NonWrappableColumn>{mountTree(route)}</NonWrappableColumn>
      ));
  }

  function getRouteLink(
    route: DataSnapshot,
    subpath: string = "",
    level: number = 1
  ) {
    return (
      <RouteLink href={`${pathname}${subpath}\\${route.key}`} level={level}>
        {(level === 1 ? ROOT_SYMBOL : CHILD_SYMBOL) + route.key}
      </RouteLink>
    );
  }

  function mountTree(
    node: DataSnapshot,
    subpath: string = "",
    recursion: number = 1
  ): JSX.Element {
    if (recursion > 3) return <></>;

    const children: DataSnapshot[] = getDataSnapshotArray(node);

    return (
      <>
        {getRouteLink(node, subpath, recursion++)}

        {children.map((route) =>
          mountTree(route, subpath + "/" + node.key, recursion)
        )}
      </>
    );
  }

  return (
    <DrawerContainer>
      {getTree()}

      {routes.length === 0 && <p>no gates here :(</p>}
    </DrawerContainer>
  );
}

export default Tree;
