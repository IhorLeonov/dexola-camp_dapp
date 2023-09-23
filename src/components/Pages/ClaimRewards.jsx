import s from "./Pages.module.scss";
import { useAccount } from "wagmi";
import { useGetUserRewards } from "../../utils/contractRead";
import { useClaimRewards } from "../../utils/contractWrite";
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
      <p className={s.page_available + " " + s.page_available_claim}>
        Available:{" "}
        <span className={s.page_available_value}>
          {!isNaN(userRewards) ? userRewards : "0"}
        </span>
        <span> STRU</span>
      </p>
      <button
        className={s.page_form_btn + " " + s.claim_btn}
        type="button"
        onClick={write}
      >
        Claim rewards
      </button>
    </div>
  );
};
