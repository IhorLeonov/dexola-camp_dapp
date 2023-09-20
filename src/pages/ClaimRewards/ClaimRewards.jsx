import s from "../pages.module.scss";
import { useAccount } from "wagmi";
import {
  useGetUserRewards,
  useClaimRewards,
} from "../../utils/contractMethods";
import { fromWei } from "../../utils/mathHelpers";

export const ClaimRewards = () => {
  const { address: userAddress } = useAccount();
  const userRewards = fromWei(useGetUserRewards(userAddress)).toFixed(2);
  const { write } = useClaimRewards();

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Claim rewards</h2>
      </div>
      <p className={s.page_available}>
        Available: <span>{!isNaN(userRewards) ? userRewards : "0"}</span>
        <span> STRU</span>
      </p>
      <button className={s.page_form_btn} type="button" onClick={write}>
        Claim rewards
      </button>
    </div>
  );
};
