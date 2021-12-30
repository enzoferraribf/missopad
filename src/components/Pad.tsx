import unescapeJs from "unescape-js";
import { useEffect, ChangeEvent, useRef } from "react";
import { onValue, ref, set } from "firebase/database";
import { db } from "../services/firebase";

const location = window.location.pathname;

function Pad() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const dbRef = ref(db, location);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      if (textAreaRef.current) {
        textAreaRef.current.innerHTML = unescapeJs(data.content);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    await set(ref(db, location), { content: text });
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
