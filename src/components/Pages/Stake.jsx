import s from "./Pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { MyContext } from "../../context/context";
import { stakeAddress } from "../../utils/contractMethods";
import { useAccount } from "wagmi";
import { fromWei, decimalWei } from "../../utils/mathHelpers";
import { useState } from "react";

import {
  useCheckAllowance,
  useStakeToken,
  useApproveToken,
  useGetTimeStampOfTheEnd,
  useGetRewardRate,
  useGetTotalSupply,
  useGetStakedBalance,
} from "../../utils/contractMethods";

export const Stake = () => {
  const { struToken, status } = MyContext();
  const [inputValue, setInputValue] = useState(0);

  const { address: userAddress } = useAccount();
  const { writeApprove } = useApproveToken();
  const { writeStake, isLoading } = useStakeToken();
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

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
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
          />
          <div className={s.page_form_error_box}>
            <p className={s.page_form_error}></p>
          </div>
          <p className={s.page_available}>
            Available:{" "}
            <span className={s.page_available_value}>
              {struToken ? struToken : "0"}{" "}
            </span>
            <span> STRU</span>
          </p>
          {/* {isLoading && <p className={s.page_available}>Loading</p>} */}
        </Form>
      </Formik>
      <button
        form="form"
        className={s.page_form_btn + " " + s.stake_btn}
        type="submit"
      >
        Stake
      </button>
    </div>
  );
};
