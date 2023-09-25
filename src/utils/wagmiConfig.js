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

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: "NfiZDC6bdVJ3L_js6h3pidOSrKDLfKAM" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Dexola camp",
  projectId: import.meta.env.VITE_DEXOLA_PROJECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  // webSocketPublicClient,
});

export { config, chains };
