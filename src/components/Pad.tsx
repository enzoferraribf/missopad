import { useLocation } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { useEffect, ChangeEvent, useRef } from "react";

import { db } from "../services/firebase";

function Pad() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    const dbRef = ref(db, pathname);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (textAreaRef.current) {
        textAreaRef.current.innerHTML = data.content;
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    await set(ref(db, pathname), { content: text });
  }

  return (
    <textarea
      ref={textAreaRef}
      aria-multiline
      wrap="hard"
      onChange={handleTextChange}
    />
  );
}

export default Pad;
