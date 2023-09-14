import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { BrowserRouter } from "react-router-dom";

import { WagmiConfig, createConfig, configureChains, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: "NfiZDC6bdVJ3L_js6h3pidOSrKDLfKAM" }),
    publicProvider(),
  ]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <App />
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
