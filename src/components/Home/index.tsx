import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

import { ExplorerForm, HomeContainer, Title } from "./styles";

function Home() {
  const [document, setDocument] = useState("");

  const navigate = useNavigate();

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
