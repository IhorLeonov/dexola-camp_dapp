import s from "./Pages.module.scss";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useGetUserRewards } from "../helpers/contractRead";
import { useClaimRewards, useWaitClaimRewards } from "../helpers/contractWrite";
import { fromWei, decimalWei } from "../helpers/mathHelpers";
import { Loader } from "../components/Loader/Loader";
import { MyContext } from "../context/context";

export const ClaimRewards = () => {
  const { setIsLoadingTransaction, setPayload } = MyContext();
  const { address: userAddress } = useAccount();
  const userRewards = fromWei(useGetUserRewards(userAddress)).toFixed(2);
  const { writeClaim, dataClaim, claimIsLoading } = useClaimRewards();
  const { claimLoading } = useWaitClaimRewards(dataClaim);

  useEffect(() => {
    if (claimLoading) setIsLoadingTransaction("claim_loading");
  }, [claimLoading]);

  const handleClick = () => {
    setPayload(userRewards * decimalWei);
    writeClaim();
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Claim rewards</h2>
      </div>
      <p className={s.claim_available}>
        Available:{" "}
        <span className={s.claim_available_value}>
          {!isNaN(userRewards) ? userRewards : "0"}
        </span>
        <span> STRU</span>
      </p>
      <button
        className={s.page_form_btn + " " + s.claim_btn}
        type="button"
        onClick={handleClick}
        disabled={claimIsLoading}
      >
        {claimIsLoading ? <Loader width={24} /> : "Claim rewards"}
      </button>
    </div>
  );
};
