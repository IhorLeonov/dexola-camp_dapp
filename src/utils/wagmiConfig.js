import { createConfig, configureChains, mainnet, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
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

export default config;
