import s from "./Header.module.scss";
import { Icon } from "../../utils/IconSelector";
import ethLogo from "../../assets/icons/eth-logo.svg";
// import useCheckIsMobile from "../../hooks/useCheckMobileDevice";
import { useAccount, useConnect } from "wagmi";

const deepLinkURL =
  "https://metamask.app.link/dapp/dexola-camp-dapp.vercel.app/";

export const Header = () => {
  const { connect, connectors, isLoading } = useConnect();
  const { isConnected, address } = useAccount();

  // const { data } = useBalance({ addressOrName: address });

  const userAddress = (address?.slice(0, 17) + "...").toUpperCase();

  // console.log(data);

  console.log(window.ethereum);

  return (
    <header className={s.header}>
      <div className={s.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon id="logo" />
        </a>
        {isConnected ? (
          <div className={s.wallet_info}>
            <img className={s.eth_logo} src={ethLogo} alt="Ethereum logo" />
            {userAddress}
          </div>
        ) : (
          <button
            type="button"
            className={s.header_btn}
            onClick={
              // isMobile
              //   ? window.open(deepLinkURL)
              //   :
              window.ethereum
                ? () => connect({ connector: connectors[0] })
                : window.open(deepLinkURL)
            }
          >
            {isLoading ? "(connecting)" : "Connect wallet"}
          </button>
        )}

        {/* {error && <div>{error.message}</div>} */}
      </div>
    </header>
  );
};
