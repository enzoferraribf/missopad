import GUN from "gun";
import unescapeJs from "unescape-js";
import { useEffect, ChangeEvent, useRef } from "react";

const database = GUN({ peers: ["https://missopad-server.herokuapp.com/gun"] });

const location = window.location.pathname;

function Pad() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const unregister = database.get(location).on((page) => {
      if (page?.content && textAreaRef.current) {
        textAreaRef.current.innerHTML = unescapeJs(page.content);
      }
    });

    return () => unregister?.off();
  }, []);

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    database.get(location).put({
      content: text,
    });
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
