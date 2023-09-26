import s from "./Pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { MyContext } from "../../context/context";
import { useAccount } from "wagmi";
import { fromWei, decimalWei } from "../../helpers/mathHelpers";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";
import { useStakeSchema } from "../../schemas/stake-schema";

import {
  useCheckAllowance,
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
  useGetStakedBalance,
} from "../../helpers/contractRead";
import {
  stakeAddress,
  useStakeToken,
  useApproveStaking,
  useWaitForApprove,
  useWaitForStake,
} from "../../helpers/contractWrite";

export const Stake = () => {
  const [inputValue, setInputValue] = useState("");
  const { struBalance, setIsLoadingTransaction, payload, setPayload } =
    MyContext();
  const { address: userAddress } = useAccount();
  const { stakeSchema } = useStakeSchema();

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
        validationSchema={stakeSchema}
        onSubmit={(values, actions) => {
          const { amount } = values;
          handleSubmit(amount);
          document.querySelector("#form").blur();
          actions.resetForm();
        }}
      >
        {({ errors }) => {
          const warningStyles = () => {
            return errors.amount ? s.page_form_input_warning : "";
          };
          return (
            <Form
              id="form"
              className={s.page_form}
              onChange={handleInputChange}
            >
              <Input
                className={s.page_form_input + " " + warningStyles()}
                type="number"
                name="amount"
                placeholder="Enter stake amount"
                autoComplete="off"
                min="0.000001"
                step="0.000001"
              />
              <div className={s.page_form_error_box}>
                <p className={s.page_form_error}>{errors.amount}</p>
              </div>
              <p className={s.page_available}>
                Available:{" "}
                <span className={s.page_available_value}>
                  {struBalance ? struBalance : "0"}{" "}
                </span>
                <span> STRU</span>
              </p>
            </Form>
          );
        }}
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
