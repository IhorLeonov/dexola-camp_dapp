import s from "./Pages.module.scss";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import {
  useGetStakedBalance,
  // useGetUserRewards,
} from "../helpers/contractRead";

import {
  useWithdraw,
  useWaitForWithdraw,
  useTakeAll,
  useWaitTakeAll,
} from "../helpers/contractWrite";

import { MyContext } from "../context/context";
import { Loader } from "../components/Loader/Loader";
import { TransactionsForm } from "../components/TransactionsForm/TransactionsForm";
import { formatEther, parseEther } from "viem";

export const Withdraw = () => {
  const { setIsLoadingTransaction, setPayload } = MyContext();
  const { address } = useAccount();
  const stakedBalance = useGetStakedBalance(address);
  const formattedStakedBalance = Math.round(Number(formatEther(stakedBalance)));
  // const userRewards = useGetUserRewards(address);

  const { writeWithdraw, dataWithdraw, withdrawIsLoading } = useWithdraw();
  const { takeAllWrite, takeAllData, takeAllIsLoading } = useTakeAll();

  const { withdrawLoading } = useWaitForWithdraw(dataWithdraw);
  const { takeAllLoading } = useWaitTakeAll(takeAllData);

  useEffect(() => {
    if (withdrawLoading) setIsLoadingTransaction("withdraw_loading");
    if (takeAllLoading) setIsLoadingTransaction("exit_loading");
  }, [withdrawLoading, takeAllLoading]);

  const handleSubmit = (amount) => {
    const payload = parseEther(amount);

    setPayload(payload);
    writeWithdraw({ args: [payload] });
  };

  const handleTakeAll = () => {
    // setPayload(stakedBalance + userRewards);
    takeAllWrite();
  };

  const isLoading = withdrawIsLoading || takeAllIsLoading;

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Withdraw</h2>
      </div>
      <TransactionsForm
        handleSubmit={handleSubmit}
        balance={formattedStakedBalance}
      />
      <div className={s.withdrow_buttons_box}>
        <button
          form="form"
          className={s.page_form_btn + " " + s.withdraw_btn}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader width={24} /> : "Withdraw"}
        </button>
        <button
          className={s.page_form_btn + " " + s.withdraw_btn_all}
          type="button"
          onClick={handleTakeAll}
        >
          withdraw all & Claim rewards
        </button>
      </div>
    </div>
  );
};
