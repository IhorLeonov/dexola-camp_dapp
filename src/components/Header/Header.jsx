import s from "./Header.module.scss";
import ethLogo from "../../assets/icons/eth-logo.svg";
import struLogo from "../../assets/images/stru-logo.png";

import { Icon } from "../SelectIcons/SelectIcons";
import { useEffect } from "react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useGetSTRUBalance } from "../../helpers/contractRead";
import { MyContext } from "../../context/context";
import { ConnectBtn } from "../ConnectBtn/ConnectBtn";
import { formatEther } from "viem";
import { toFixedDigits } from "../../helpers/mathHelpers";

export const Header = () => {
  const { setStruBalance, setIsWalletConnect } = MyContext();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletBalance } = useBalance({ address });
  const struBalance = useGetSTRUBalance(address);

  const formattedAddress = address?.slice(0, 17) + "...";
  const formattedStruBalance = isConnected
    ? toFixedDigits(Number(formatEther(struBalance)))
    : 0;
  const formattedWalletBalance = toFixedDigits(
    Number(walletBalance?.formatted)
  );

  useEffect(() => {
    if (isConnected) {
      setStruBalance(formattedStruBalance);
      setIsWalletConnect(true);
    }
  }, [struBalance]);

  const handleDisconnect = () => {
    disconnect();
    setIsWalletConnect(false);
  };

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon name="logo" width={35} height={20} />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.stru_logo} src={struLogo} alt="STRU logo" />
            {formattedStruBalance ? formattedStruBalance : "0.00"} STRU
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {walletBalance ? formattedWalletBalance : "0.00"}{" "}
            {walletBalance?.symbol}
            <span className={s.wallet_adress}>|</span>
            <span className={s.wallet_adress}>
              {address ? formattedAddress : "unknown"}
            </span>
            <button
              type="button"
              className={s.dcnnct_btn}
              onClick={handleDisconnect}
            >
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
