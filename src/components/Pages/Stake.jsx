import s from "./Pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { MyContext } from "../../context/context";
import { stakeAddress } from "../../utils/contractMethods";
import { useAccount } from "wagmi";
import { fromWei, decimalWei } from "../../utils/mathHelpers";
import { useEffect, useState } from "react";
import { useWaitForTransaction } from "wagmi";
import { Loader } from "../Loader/Loader";

import {
  useCheckAllowance,
  useStakeToken,
  useApproveStaking,
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
  useGetStakedBalance,
} from "../../utils/contractMethods";

export const Stake = () => {
  const [inputValue, setInputValue] = useState(0);
  const [payload, setPayload] = useState(0);

  const { struBalance, status, setStatus } = MyContext();
  const { address: userAddress } = useAccount();

  const allowance = useCheckAllowance(userAddress);
  const periodFinish = useGetTimeStampOfTheEnd();
  const currentStamp = Date.now() / 1000;
  const remaining = periodFinish - currentStamp;
  const rewardRate = useGetRewardRate();
  const totalAvailble = remaining * rewardRate;
  const totalSupply = useGetTotalSupply();
  const stakedBalance = useGetStakedBalance(userAddress);
  const userInput = inputValue * decimalWei;
  const totalRate = Math.round(
    fromWei((stakedBalance * totalAvailble) / totalSupply + userInput)
  );

  const { writeApprove, apprWriteLoading, apprData } = useApproveStaking();
  const { writeStake, stakeWriteLoading, stakeData } = useStakeToken();

  const { isLoading: apprLoading } = useWaitForTransaction({
    hash: apprData?.hash,
    onSuccess(data) {
      console.log("Success approve", data);
      setStatus("success");
      writeStake({ args: [payload] });
    },
    onError(error) {
      console.log("Error approve", error.message);
      setStatus("error");
    },
  });

  const { isLoading: stakeLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSuccess(data) {
      console.log("Success stake", data);
      setStatus("success");
    },
    onError(error) {
      console.log("Error stake", error.message);
      setStatus("error");
    },
  });

  useEffect(() => {
    if (apprLoading) setStatus("approve_loading");
    if (stakeLoading) setStatus("stake_loading");

    return () => {};
  }, [apprLoading, stakeLoading, setStatus]);

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
    setPayload(payload);

    if (allowance < payload) {
      writeApprove({ args: [stakeAddress, payload] });
    } else writeStake({ args: [payload] });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={(values, actions) => {
          const { amount } = values;
          handleSubmit(amount);
          actions.resetForm();
        }}
      >
        <Form id="form" className={s.page_form} onChange={handleInputChange}>
          <Input
            className={s.page_form_input}
            type="number"
            name="amount"
            placeholder="Enter stake amount"
            autoComplete="off"
            min="0"
          />
          <div className={s.page_form_error_box}>
            <p className={s.page_form_error}></p>
          </div>
          <p className={s.page_available}>
            Available:{" "}
            <span className={s.page_available_value}>
              {struBalance ? struBalance : "0"}{" "}
            </span>
            <span> STRU</span>
          </p>
          {<p className={s.page_available}>STATUS: {status}</p>}
        </Form>
      </Formik>
      <button
        form="form"
        className={s.page_form_btn + " " + s.stake_btn}
        type="submit"
        disabled={apprWriteLoading || stakeWriteLoading}
      >
        {apprWriteLoading || stakeWriteLoading ? (
          <Loader width={24} />
        ) : (
          "Stake"
        )}
      </button>
    </div>
  );
};
