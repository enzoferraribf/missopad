import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { db } from "../services/firebase";
import { DataSnapshot, get, ref } from "firebase/database";

function Tree() {
    const { pathname } = useLocation();

    const [routes, setRoutes] = useState<DataSnapshot[]>([]);

    useEffect(() => {
        const dbRef = ref(db, pathname);

        const childs: DataSnapshot[] = [];

        get(dbRef).then((value) => {
            value.forEach((child) => {
                if (child.size > 0) {
                    childs.push(child);
                }
            });

            setRoutes(childs);
        });

    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", padding: "3em 1em", position: "absolute", 
                    height: "100%", top: "0", width: "15%", overflowY: "scroll", overflowX: "hidden", backgroundColor: "#0d0f17" }}>
            {routes.map((route) => {
                return <a href={`${pathname}\\${route.key}`} style={{ color: "white", marginBottom: "0.2em", overflowWrap: "break-word" }}>.\{route.key}</a>
            })}
            {routes.length == 0 ?
            <p>any gates here :(</p> : <></>}
        </div>
    )
}

export default Tree;