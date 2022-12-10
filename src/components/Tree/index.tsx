import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataSnapshot, get, ref } from "firebase/database";

import { db } from "services/firebase";

import { DrawerContainer, MissoGatesLogo, NonWrappableColumn, RouteLink } from "./styles";

const ROOT_SYMBOL = ".\\";
const CHILD_SYMBOL = "↳ ";

function Tree() {
  const { pathname } = useLocation();
  const [parentRoute, setParentRoute] = useState<DataSnapshot | null>(null);
  const [myKey,setMyKey] = useState<string|null>(null);
  const [routes, setRoutes] = useState<DataSnapshot[]>([]);
  const [showMissogates, setShowMissogates] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, pathname);

    async function handleRoutes() {
      const routes = await get(dbRef);

      if (dbRef.parent) {
        const parent = await get(dbRef.parent);
        setParentRoute(parent)
      }
      setMyKey(routes.key)
      setRoutes(getDataSnapshotArray(routes));
    }
    if (showMissogates)
      handleRoutes();
  }, [pathname, showMissogates]);

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
    return <>
      {parentRoute?.key && <NonWrappableColumn>

        <RouteLink href={`${pathname.replace(`/${myKey}`, "")}`} level={1}>
          {"↰ " + parentRoute.key}
        </RouteLink>
      </NonWrappableColumn>
      }
      {
        routes
          .filter(({ size }) => size > 0)
          .map((route) => (
            <NonWrappableColumn>{mountTree(route,"", parentRoute?.key? 2:1,true )}</NonWrappableColumn>
          ))
      }
    </>
  }

  function getRouteLink(
    route: DataSnapshot,
    subpath: string = "",
    level: number = 1,
    root: boolean = false
  ) {
    return (
      <RouteLink href={`${pathname}${subpath}\\${route.key}`} level={level}>
        {(root? ROOT_SYMBOL : CHILD_SYMBOL) + route.key}
      </RouteLink>
    );
  }

  function mountTree(
    node: DataSnapshot,
    subpath: string = "",
    recursion: number = 1,
    root: boolean = false
  ): JSX.Element {
    if (recursion > 4) return <></>;

    const children: DataSnapshot[] = getDataSnapshotArray(node);

    return (
      <>
        {getRouteLink(node, subpath, recursion++,root)}

        {children.map((route) =>
          mountTree(route, subpath + "/" + node.key, recursion,false)
        )}
      </>
    );
  }


  return (
    <>
      <MissoGatesLogo onClick={() => setShowMissogates(!showMissogates)}>
        ✈️ {showMissogates && " MissoGates"}
      </MissoGatesLogo>

      {
        showMissogates && <DrawerContainer>
          {routes.length === 0 ? <p>No gates here :(</p> : getTree()}
        </DrawerContainer>
      }

    </>


  );
}

export default Tree;
