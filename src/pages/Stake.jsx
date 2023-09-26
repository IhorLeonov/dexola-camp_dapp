import s from "./Pages.module.scss";
import { MyContext } from "../context/context";
import { useAccount } from "wagmi";
import { fromWei, decimalWei } from "../helpers/mathHelpers";
import { useEffect } from "react";
import { Loader } from "../components/Loader/Loader";
import { TransactionsForm } from "../components/TransactionsForm/TransactionsForm";

import {
  useCheckAllowance,
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
  useGetStakedBalance,
} from "../helpers/contractRead";

import {
  stakeAddress,
  useStakeToken,
  useApproveStaking,
  useWaitForApprove,
  useWaitForStake,
} from "../helpers/contractWrite";

export const Stake = () => {
  const {
    struBalance,
    setIsLoadingTransaction,
    payload,
    setPayload,
    inputValue,
  } = MyContext();
  const { address: userAddress } = useAccount();

  const allowance = useCheckAllowance(userAddress);
  const stakedBalance = useGetStakedBalance(userAddress);

  const periodFinish = useGetTimeStampOfTheEnd();
  const currentStamp = Date.now() / 1000;
  const remaining = periodFinish - currentStamp;
  const rewardRate = useGetRewardRate();
  const totalAvailble = remaining * rewardRate;
  const totalSupply = useGetTotalSupply();
  const userInput = inputValue * decimalWei;
  const totalRate = Math.round(
    fromWei((stakedBalance * totalAvailble) / totalSupply + userInput)
  );

  const { writeApprove, apprWriteLoading, apprData } = useApproveStaking();
  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();
  const { apprLoading } = useWaitForApprove(apprData, writeStake, payload);
  const { stakeLoading } = useWaitForStake(stakeData);

  useEffect(() => {
    if (apprLoading) setIsLoadingTransaction("approve_loading");
    if (stakeLoading) setIsLoadingTransaction("stake_loading");
  }, [apprLoading, stakeLoading]);

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
    setPayload(payload);

    if (allowance < payload) {
      writeApprove({ args: [stakeAddress, payload] });
    } else writeStake({ args: [payload] });
  };

  const isLoading = apprWriteLoading || stakeWriteLoading;

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Stake</h2>
        <p>
          <span className={s.page_rate_title}>Reward rate: </span>
          <span className={s.page_rate_value}>
            {totalRate ? totalRate : "0"}
          </span>
          <span className={s.page_rate_desc}> STRU/WEEK</span>
        </p>
      </div>
      <TransactionsForm handleSubmit={handleSubmit} balance={struBalance} />
      <button
        form="form"
        className={s.page_form_btn + " " + s.stake_btn}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Loader width={24} /> : "Stake"}
      </button>
    </div>
  );
};
