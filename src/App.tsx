import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pad from "./components/Pad";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 0,
  position: positions.BOTTOM_CENTER,
};

function App() {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/*" element={<Pad />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
