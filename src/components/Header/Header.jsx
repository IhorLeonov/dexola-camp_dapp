import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";
import struLogo from "../../assets/images/stru-logo.png";

import { Icon } from "../../utils/selectorIcons";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useAccount, useConnect, useBalance, useDisconnect } from "wagmi";
import { useGetSTRUBalance } from "../../utils/contractMethods";
import { fromWei } from "../../utils/mathHelpers";
import { MyContext } from "../../context/context";

const deepLinkUrl =
  "https://metamask.app.link/dapp/dexola-camp-dapp.vercel.app/";

export const Header = () => {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { setStruToken } = MyContext();

  const walletBalance = Number(balance?.formatted).toFixed(1);
  const struBalance = fromWei(useGetSTRUBalance(address));
  const formattedAddress = address?.slice(0, 17) + "...";

  const handleConnect = () => {
    window.ethereum
      ? connect({ connector: connectors[0] })
      : window.open(deepLinkUrl);
  };

  useEffect(() => {
    setStruToken(struBalance);
  }, [setStruToken, struBalance]);

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
            <img className={s.stru_logo} src={struLogo} alt="STRU logo" />
            {struBalance ? struBalance : "0.00"} STRU
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {balance ? walletBalance : "0.00"} {balance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? formattedAddress : "unknown"}
            </span>
            <button type="button" className={s.dcnnct_btn} onClick={disconnect}>
              <Icon name="logout" width={18} height={18} />
            </button>
          </div>
        ) : (
          <button type="button" className={s.cnnct_btn} onClick={handleConnect}>
            {isLoading ? <Loader width={24} /> : "Connect wallet"}
          </button>
        )}
        {/* {error && <div>{error.message}</div>} */}
      </div>
    </header>
  );
};
