import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";

import { Icon } from "../../utils/selectorIcons";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useAccount, useConnect, useBalance, useDisconnect } from "wagmi";

export const Header = () => {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const deepLinkUrl =
    "https://metamask.app.link/dapp/dexola-camp-dapp.vercel.app/";

  const handleConnect = () => {
    window.ethereum
      ? connect({ connector: connectors[0] })
      : window.open(deepLinkUrl);
  };

  useEffect(() => {
    if (window.ethereum) window.ethereum.on("accountsChanged", handleConnect);
  }, [window.ethereum]);

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon name="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {balance ? Number(balance?.formatted).toFixed(1) : "0.00"}{" "}
            {balance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? address?.slice(0, 17) + "..." : "unknown"}
            </span>
            <button onClick={disconnect}>
              <Icon name="logout" width={16} height={16} />
            </button>
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
