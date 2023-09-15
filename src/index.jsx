import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { ContextProvider } from "./context/context";
import { BrowserRouter } from "react-router-dom";
import { WagmiConfig } from "wagmi";
import config from "./utils/wagmiConfig";

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
