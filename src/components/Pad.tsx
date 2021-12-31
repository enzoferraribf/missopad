import { useLocation } from "react-router-dom";
import { onValue, ref, runTransaction } from "firebase/database";
import { useEffect, ChangeEvent, useState, useRef } from "react";

import { db } from "../services/firebase";

function Pad() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const { pathname } = useLocation();

  useEffect(() => {
    const dbRef = ref(db, pathname);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const textArea = textAreaRef.current;

      if (snapshot && textArea) {
        const { content: serverContent } = snapshot.val();
        const localContent = textArea.value;

        let previousPosition = textArea.selectionEnd;

        const beforeCaret = localContent.substring(0, previousPosition);
        const newBeforeCaret = serverContent.substring(0, previousPosition);

        if (beforeCaret !== newBeforeCaret) {
          previousPosition += serverContent.length - localContent.length;
        }

        setTextAreaContent(serverContent);

        textArea.selectionStart = previousPosition;
        textArea.selectionEnd = previousPosition;
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    const dbRef = ref(db, pathname);

    await runTransaction(
      dbRef,
      (snapshot) => {
        snapshot = { content: text };

        return snapshot;
      },
      { applyLocally: false }
    );
  }

  return (
    <textarea
      ref={textAreaRef}
      value={textAreaContent}
      aria-multiline
      wrap="hard"
      onChange={handleTextChange}
    />
  );
}

export default Pad;
