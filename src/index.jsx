import "./sass/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import config from "./utils/wagmiConfig";

import { WagmiConfig } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
