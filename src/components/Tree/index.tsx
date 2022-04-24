import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { db } from "services/firebase";
import { DataSnapshot, get, ref } from "firebase/database";

function Tree() {
  const ROOT_SYMBOL = ".\\";
  const CHILD_SYMBOL = "↳ ";

  const { pathname } = useLocation();

  const [routes, setRoutes] = useState<DataSnapshot[]>([]);

  useEffect(() => {
    const dbRef = ref(db, pathname);

    get(dbRef).then((value) => {
      setRoutes(getDataSnapshotArray(value));
    });
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
      .filter((route) => route.size > 0)
      .map((route) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            whiteSpace: "nowrap",
          }}
        >
          {mountTree(route)}
        </div>
      ));
  }

  function getRouteLink(
    route: DataSnapshot,
    subpath: string = "",
    level: number = 1
  ) {
    return (
      <a
        href={`${pathname}${subpath}\\${route.key}`}
        style={{
          color: "white",
          marginBottom: "0.2em",
          overflowWrap: "break-word",
          textDecoration: "none",
          marginLeft: level - 1 + "em",
        }}
      >
        {(level === 1 ? ROOT_SYMBOL : CHILD_SYMBOL) + route.key}
      </a>
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
        {children.map((route) => {
          return mountTree(route, subpath + "/" + node.key, recursion);
        })}
      </>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "3em 1em",
        position: "absolute",
        height: "100%",
        top: "0",
        width: "30%",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "#0d0f17",
      }}
    >
      {getTree()}
      {routes.length === 0 && <p>no gates here :(</p>}
    </div>
  );
}

export default Tree;
