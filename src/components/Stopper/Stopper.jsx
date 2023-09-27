import s from "./Stopper.module.scss";
import crossIcon from "../../assets/icons/circle-cross.svg";
import walletIcon from "../../assets/icons/wallet-card.svg";
import { ConnectBtn } from "../ConnectBtn/ConnectBtn";

export const Stopper = () => {
  return (
    <div className={s.stopper}>
      <div className={s.stopper_img_box}>
        <img src={walletIcon} alt="Wallet icon" />
        <img className={s.stopper_cross_img} src={crossIcon} alt="Cross icon" />
      </div>
      <p className={s.stopper_desc}>
        To start staking you need to connect you wallet first
      </p>
      <div className={s.stopper_button_box}>
        <ConnectBtn />
      </div>
    </div>
  );
};
