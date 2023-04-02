import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Pad } from "components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Pad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
