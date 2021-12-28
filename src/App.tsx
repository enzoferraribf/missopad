import GUN from "gun";
import { useEffect, ChangeEvent, useRef } from "react";
import Home from "./components/Home";

const database = GUN({ peers: ["https://missopad-server.herokuapp.com/gun"] });

const location = window.location.pathname;

const unescapeNewLine = (str: string) =>
  str.replace(/\\n/g, "\n").replace(/\\r/g, "\r");

function App() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const unregister = database.get(location).on((page) => {
      if (page?.content && textAreaRef.current) {
        textAreaRef.current.innerHTML = unescapeNewLine(page.content);
      }
    });

    return () => unregister?.off();
  }, []);

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;

    database.get(location).put({
      content: unescapeNewLine(text),
    });
  }

  function HomeOrText() {
    if (location === "/") {
      return <Home />;
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

  return <HomeOrText />;
}

export default App;
