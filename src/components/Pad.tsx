import { nanoid } from "nanoid";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { get, onValue, ref } from "firebase/database";
import { useEffect, ChangeEvent, useState } from "react";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import ReactMarkdown from "react-markdown";
import RemarkGfm from "remark-gfm";
import RemarkBreaks from "remark-breaks";

import { auth, db, signInAnonymously } from "../services/firebase";
import { ServerDoc } from "../types/ServerDoc";

import { handleWriting } from "../utils/writing";
import { lessThan } from "../utils/time";

import Tree from "./Tree";

import "github-markdown-css";

const USER_ID = nanoid(5);
const POLL_TIME = 3000;

function Pad() {
  const alert = useAlert();
  const { pathname } = useLocation();

  const [content, setContent] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);

  const [disabled, setDisabled] = useState<boolean>(false);

  const [onlyView, setOnlyView] = useState<boolean>(false);

  const [showMissogates, setShowMissogates] = useState<boolean>(false);

  useEffect(() => {
    signInAnonymously(auth);
  }, []);

  useEffect(() => {
    const dbRef = ref(db, pathname);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      setLoaded(true);

      if (!snapshot) return;

      const serverDoc: ServerDoc = snapshot.val();

      setContent(serverDoc.content);
      handleDisable(serverDoc);
    });

    const interval = setInterval(async () => {
      const snapshot = await get(dbRef);

      const serverDoc: ServerDoc = snapshot.val();

      handleDisable(serverDoc);
    }, POLL_TIME);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [pathname]);

  useEffect(() => {
    if (!disabled) {
      (alert as any).removeAll();
    }

    const alertsActive = alert.alerts.length;

    if (disabled && !alertsActive) {
      alert.show("someone is typing, hold on");
    }
  }, [disabled]);

  function handleDisable(serverDoc: ServerDoc) {
    const isDifferentAuthor = serverDoc.author !== USER_ID;

    const newDisabled =
      isDifferentAuthor && lessThan(serverDoc.updatedAt, POLL_TIME);

    setDisabled(newDisabled);
  }

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    if (!loaded) {
      return;
    }

    await handleWriting(pathname, { content: text, author: USER_ID });
  }

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "99vw",
          height: "3vh",
          padding: "2vh",
        }}
      >
        <h3
          style={{ position: "absolute", top: 10, left: 10, zIndex: 9999 }}
          className="logo"
          onClick={() => setShowMissogates(!showMissogates)}
        >
          ✈️{showMissogates && " missogates"}
        </h3>
        <h2 className="logo" onClick={() => setOnlyView(!onlyView)}>
          MISSOPAD{" "}
        </h2>
        {onlyView && "👀"}
      </header>

      {showMissogates && <Tree />}

      <div style={{ display: "flex", flexDirection: "row" }}>
        {!onlyView && (
          <textarea
            disabled={disabled}
            value={content}
            aria-multiline
            wrap="hard"
            onChange={handleTextChange}
          />
        )}

        <div
          style={{
            padding: 30,
            width: onlyView ? "100vw" : "50vw",
            height: "96vh",
            overflowY: "scroll",
          }}
          className="markdown-body"
        >
          <ReactMarkdown
            children={content}
            remarkPlugins={[RemarkGfm, RemarkBreaks]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Pad;
