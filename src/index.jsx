import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/index.scss";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/dexola-camp_dapp">
      {/* <BrowserRouter> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
