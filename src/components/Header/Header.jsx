import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";
import struLogo from "../../assets/images/stru-logo.png";

import { Icon } from "../SelectIcons/SelectIcons";
import { useEffect } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useGetSTRUBalance } from "../../helpers/contractRead";
import { fromWei } from "../../helpers/mathHelpers";
import { MyContext } from "../../context/context";
import { ConnectBtn } from "../ConnectBtn/ConnectBtn";

export const Header = () => {
  const { setStruBalance } = MyContext();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const walletBalance = Number(balance?.formatted).toFixed(1);
  const struBalance = Math.round(fromWei(useGetSTRUBalance(address)));
  const formattedAddress = address?.slice(0, 17) + "...";

  useEffect(() => {
    if (isConnected) {
      setStruBalance(struBalance);
    }
  }, [struBalance]);

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
          <div className={s.connect_btn_box}>
            <ConnectBtn />
          </div>
        )}
      </div>
    </header>
  );
};
