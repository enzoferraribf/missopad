import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { get, onValue, ref } from "firebase/database";
import { useEffect, ChangeEvent, useState, useCallback } from "react";

import { auth, db, signInAnonymously } from "services/firebase";

import { handleWriting } from "utils/writing";
import { lessThan } from "utils/time";

import { Tree, MarkdownRenderer } from "components";
import {
  Editor,
  HeaderTitle,
  MissoGatesLogo,
  PadContainer,
  PadHeader,
  Previewer,
} from "./styles";

import { ServerDoc } from "types/ServerDoc";

const POLL_TIME = 3000;

function Pad() {
  const alert = useAlert();

  const { pathname } = useLocation();

  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [onlyView, setOnlyView] = useState(false);
  const [showMissogates, setShowMissogates] = useState(false);

  useEffect(() => {
    async function signIn() {
      const { user } = await signInAnonymously(auth);
      setUserId(user.uid);
    }

    signIn();
  }, []);

  const handleDisable = useCallback(
    (serverDoc: ServerDoc) => {
      if (!userId) return;

      const isDifferentAuthor = serverDoc.author !== userId;

      const newDisabled =
        isDifferentAuthor && lessThan(serverDoc.updatedAt, POLL_TIME);

      setDisabled(newDisabled);
    },
    [userId]
  );

  useEffect(() => {
    if (!userId) return;

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
  }, [pathname, userId, handleDisable]);

  useEffect(() => {
    if (!disabled) {
      (alert as any).removeAll();
    }

    const alertsActive = (alert as any).alerts.length;

    if (disabled && !alertsActive) {
      alert.show("someone is typing");
    }
  }, [alert, disabled]);

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    if (!loaded) return;

    await handleWriting(pathname, { content: text, author: userId });
  }

  return (
    <div>
      <PadHeader>
        <MissoGatesLogo onClick={() => setShowMissogates(!showMissogates)}>
          ✈️{showMissogates && " MissoGates"}
        </MissoGatesLogo>

        <HeaderTitle onClick={() => setOnlyView(!onlyView)}>
          MISSOPAD
        </HeaderTitle>

        {onlyView && "👀"}
      </PadHeader>

      {showMissogates && <Tree />}

      <PadContainer>
        {!onlyView && (
          <Editor
            disabled={disabled}
            value={content}
            aria-multiline
            wrap="hard"
            onChange={handleTextChange}
          />
        )}

        <Previewer onlyView={onlyView} className="markdown-body">
          <MarkdownRenderer content={content} />
        </Previewer>
      </PadContainer>
    </div>
  );
}

export default Pad;
