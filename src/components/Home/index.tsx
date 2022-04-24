import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { signInAnonymously, auth } from "services/firebase";

function Home() {
  const [document, setDocument] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    signInAnonymously(auth);
  }, []);

  function handleDocumentChange(e: ChangeEvent<HTMLInputElement>) {
    const document = e.target.value;

    setDocument(document);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    navigate(`/${document}`);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
        width: "100vw",
      }}
    >
      <h1 style={{ marginBottom: "20px", fontSize: "10vw" }}>MISSOPAD</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <label style={{ fontSize: "5vw", marginRight: "10px" }}>
            missopad.com/
          </label>

          <input
            style={{ fontSize: "3vw", padding: "5px" }}
            type="text"
            placeholder="document..."
            value={document}
            onChange={handleDocumentChange}
          />

          <a
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "10px",
              fontSize: "3vw",
              padding: "5px",
              border: "1px solid black",
              backgroundColor: "#eee",
            }}
            href={`/${document}`}
          >
            Go!
          </a>
        </form>
      </div>
    </div>
  );
}

export default Home;
