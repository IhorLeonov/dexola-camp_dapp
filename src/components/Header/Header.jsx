import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";

import { Icon } from "../../utils/IconSelector";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useAccount, useConnect, useBalance } from "wagmi";

export const Header = () => {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address: address });

  const deepLinkUrl =
    "https://metamask.app.link/dapp/dexola-camp-dapp.vercel.app/";

  const handleConnect = () => {
    window.ethereum
      ? connect({ connector: connectors[0] })
      : window.open(deepLinkUrl);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleConnect);
    }
  });

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon id="logo" />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {balance?.formatted} {balance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address?.slice(0, 17) + "..."}
            </span>
          </div>
        ) : (
          <button
            type="button"
            className={s.header_btn}
            onClick={handleConnect}
          >
            {isLoading ? <Loader width={24} /> : "Connect wallet"}
          </button>
        )}
        {/* {error && <div>{error.message}</div>} */}
      </div>
    </header>
  );
};
