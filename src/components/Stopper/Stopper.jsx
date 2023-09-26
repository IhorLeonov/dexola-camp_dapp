import s from "./Stopper.module.scss";
import crossIcon from "../../assets/icons/circle-cross.svg";
import walletIcon from "../../assets/icons/wallet-card.svg";

export const Stopper = () => {
  return (
    <div className={s.stopper}>
      <div className={s.stopper_img_box}>
        <img src={walletIcon} alt="Wallet icon" />
        <img src={crossIcon} alt="Cross icon" />
      </div>
      <p className={s.stopper_desc}>
        To start staking you need{" "}
        <span className={s.stopper_desc_string}>
          to connect you wallet first
        </span>
      </p>
      <button></button>
    </div>
  );
};
