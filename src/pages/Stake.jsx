import s from "./Pages.module.scss";
import { MyContext } from "../context/context";
import { useAccount } from "wagmi";
import { currentStamp, fromWei } from "../helpers/mathHelpers";
import { useEffect, useMemo } from "react";
import { Loader } from "../components/Loader/Loader";
import { TransactionsForm } from "../components/TransactionsForm/TransactionsForm";
import { parseEther } from "viem";

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
  const stakedBalance = Number(useGetStakedBalance(userAddress));
  const periodFinish = Number(useGetTimeStampOfTheEnd());
  const remaining = periodFinish - currentStamp;
  const rewardRate = Number(useGetRewardRate());
  const totalAvailble = remaining * rewardRate;
  const totalSupply = Number(useGetTotalSupply());

  const { writeApprove, apprWriteLoading, apprData } = useApproveStaking();
  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();

  const { apprLoading } = useWaitForApprove(apprData, writeStake, payload);
  const { stakeLoading } = useWaitForStake(stakeData);

  const totalRate = useMemo(() => {
    return Math.round(
      fromWei(
        (stakedBalance * totalAvailble) / totalSupply + Number(inputValue)
      )
    );
  }, [stakedBalance, totalAvailble, totalSupply, inputValue]);

  useEffect(() => {
    if (apprLoading) setIsLoadingTransaction("approve_loading");
    if (stakeLoading) setIsLoadingTransaction("stake_loading");
  }, [apprLoading, stakeLoading]);

  const handleSubmit = (amount) => {
    const payload = parseEther(amount);

    // 0.999999999999999999
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
