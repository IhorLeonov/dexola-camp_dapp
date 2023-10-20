import s from "./Pages.module.scss";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import {
  useGetStakedBalance,
  useGetUserRewards,
} from "../helpers/contractRead";

import {
  useWithdraw,
  useWaitForWithdraw,
  useTakeAll,
  useWaitTakeAll,
} from "../helpers/contractWrite";

import { fromWei, decimalWei } from "../helpers/mathHelpers";
import { useAppContext } from "../context/context";
import { Loader } from "../components/Loader/Loader";
import { TransactionsForm } from "../components/TransactionsForm/TransactionsForm";

export const Withdraw = () => {
  const { setIsLoadingTransaction, setPayload } = useAppContext();
  const { address: userAddress } = useAccount();
  const stakedBalance = Math.round(fromWei(useGetStakedBalance(userAddress)));
  const userRewards = useGetUserRewards(userAddress);
  const { writeWithdraw, dataWithdraw, withdrawIsLoading } = useWithdraw();
  const { takeAllWrite, takeAllData, takeAllIsLoading } = useTakeAll();
  const { withdrawLoading } = useWaitForWithdraw(dataWithdraw);
  const { takeAllLoading } = useWaitTakeAll(takeAllData);

  useEffect(() => {
    if (withdrawLoading) setIsLoadingTransaction("withdraw_loading");
    if (takeAllLoading) setIsLoadingTransaction("exit_loading");
  }, [withdrawLoading, takeAllLoading]);

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
    setPayload(payload);
    writeWithdraw({ args: [payload] });
  };

  const handleTakeAll = () => {
    setPayload(stakedBalance * decimalWei + userRewards);
    takeAllWrite();
  };

  const isLoading = withdrawIsLoading || takeAllIsLoading;

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Withdraw</h2>
      </div>
      <TransactionsForm handleSubmit={handleSubmit} balance={stakedBalance} />
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
