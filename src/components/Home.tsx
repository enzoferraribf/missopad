import { ChangeEvent, useState } from "react";

function Home() {
  const [document, setDocument] = useState<string>("");

  function handleDocumentChange(e: ChangeEvent<HTMLInputElement>) {
    const document = e.target.value;

    setDocument(document);
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
      <h1 style={{ marginBottom: "20px", fontSize: "50px" }}>MISSOPAD</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <form>
          <label style={{ fontSize: "25px", marginRight: "10px" }}>
            missopad.com/
          </label>

          <input
            style={{ fontSize: "15px", padding: "5px" }}
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
              fontSize: "15px",
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
