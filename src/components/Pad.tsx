import { useLocation } from "react-router-dom";
import { onValue, ref, set } from "firebase/database";
import { useEffect, ChangeEvent, useState } from "react";

import { db } from "../services/firebase";

function Pad() {
  const [textAreaContent, setTextAreaContent] = useState<string>("");

  const { pathname } = useLocation();

  useEffect(() => {
    const dbRef = ref(db, pathname);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      setTextAreaContent(data.content);
    });

    return () => unsubscribe();
  }, [pathname]);

  async function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    await set(ref(db, pathname), { content: text });
  }

  return (
    <textarea
      value={textAreaContent}
      aria-multiline
      wrap="hard"
      onChange={handleTextChange}
    />
  );
}

export default Pad;
