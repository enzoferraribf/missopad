import React from "react";
import ReactDOM from "react-dom/client";

import "the-new-css-reset/css/reset.css";

import App from "App";
import "index.css";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
