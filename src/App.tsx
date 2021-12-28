import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pad from "./components/Pad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:id" element={<Pad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
