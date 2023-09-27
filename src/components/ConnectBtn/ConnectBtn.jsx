import s from "./ConnectBtn.module.scss";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export const ConnectBtn = () => {
  const { openConnectModal } = useConnectModal();

  return (
    <button type="button" className={s.cnnct_btn} onClick={openConnectModal}>
      Connect wallet
    </button>
  );
};
