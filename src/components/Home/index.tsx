import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { signInAnonymously, auth } from "services/firebase";

import { ExplorerForm, HomeContainer, Title } from "./styles";

function Home() {
  const [document, setDocument] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      signInAnonymously(auth);
    }
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
    <HomeContainer>
      <Title>MISSOPAD</Title>

      <ExplorerForm onSubmit={handleFormSubmit}>
        <label>missopad.com/</label>

        <input
          type="text"
          value={document}
          placeholder="document..."
          onChange={handleDocumentChange}
        />

        <a href={`/${document}`}>🚀</a>
      </ExplorerForm>
    </HomeContainer>
  );
}

export default Home;
