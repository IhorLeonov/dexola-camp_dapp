import { createConfig, configureChains } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: "NfiZDC6bdVJ3L_js6h3pidOSrKDLfKAM" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Dexola camp",
  projectId: "4725f96b1e25f67ca6fb15fe2325f8de",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { config, chains };
