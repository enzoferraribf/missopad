import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";

import { nanoid } from "nanoid";
import { hex } from "@vid3v/random-color";

import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { EditorContent, useEditor } from "@tiptap/react";

import { auth, db, signInAnonymously } from "services/firebase";

import { handleWriting } from "utils/writing";

import { Tree, MarkdownRenderer } from "components";

import { HeaderTitle, PadContainer, PadHeader, Previewer } from "./styles";

const PATH = window.location.pathname;
const SAVE_INTERVAL = 2000;
const ISCONNECTED_POLLING = 200;

const collabDocument = new Y.Doc();
const collabProvider = new WebrtcProvider(PATH, collabDocument);
const id = nanoid(4);
const color = hex();

function Pad() {
  const [userId, setUserId] = useState("");
  const [currentJson, setCurrentJson] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [onlyView, setOnlyView] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
        blockquote: false,
        code: false,
        bold: false,
        bulletList: false,
        codeBlock: false,
        hardBreak: false,
        heading: false,
        horizontalRule: false,
        italic: false,
        orderedList: false,
        strike: false,
      }),
      Collaboration.configure({ document: collabDocument }),
      CollaborationCursor.configure({
        provider: collabProvider,
        user: { name: id, color: color },
      }),
    ],
  });

  useEffect(() => {
    async function signIn() {
      const { user } = await signInAnonymously(auth);

      setUserId(user.uid);
    }

    function isConnected() {
      setIsConnected(collabProvider.connected);
    }

    const isConnectedInterval = setInterval(isConnected, ISCONNECTED_POLLING);

    signIn();

    return () => clearInterval(isConnectedInterval);
  }, []);

  useEffect(() => {
    async function saveToRemote() {
      const json = editor?.getJSON();

      if (!json || JSON.stringify(json) === currentJson) return;

      await handleWriting(PATH, { content: JSON.stringify(json) });

      setCurrentJson(JSON.stringify(json));
    }

    async function getInitialContent() {
      const dbRef = ref(db, PATH);

      const snapshot = await get(dbRef);

      const content: string = snapshot.val()?.content || "";

      if (!content.startsWith('{"type":"doc"')) {
        editor?.chain().setContent(content).run();
      } else if (!editor?.getText()) {
        editor?.chain().setContent(JSON.parse(content)).run();
      }
    }

    const isRemoteInterval = setInterval(saveToRemote, SAVE_INTERVAL);

    getInitialContent();

    return () => clearInterval(isRemoteInterval);
  }, [editor, currentJson]);

  return (
    <div>
      <Tree />

      <PadHeader>
        <HeaderTitle onClick={() => setOnlyView(!onlyView)}>
          MISSOPAD
        </HeaderTitle>

        <div
          style={{
            width: "1vh",
            height: "1vh",
            backgroundColor: userId && isConnected ? "green" : "red",
            borderRadius: "50%",
            marginLeft: "1vh",
          }}
        />

        <div
          style={{
            backgroundColor: color,
            borderRadius: "4px",
            marginRight: "1vh",
            position: "absolute",
            right: 10,
          }}
        >
          <span style={{ padding: "5px" }}>{id}</span>
        </div>
      </PadHeader>

      <PadContainer>
        {!onlyView && (
          <EditorContent disabled={!userId || !isConnected} editor={editor} />
        )}

        <Previewer onlyView={onlyView} className="markdown-body">
          <MarkdownRenderer content={editor?.getText()!} />
        </Previewer>
      </PadContainer>
    </div>
  );
}

export default Pad;
