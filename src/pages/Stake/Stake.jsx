import s from "../pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { MyContext } from "../../context/context";
import { decimalWei } from "../../utils/mathHelpers";
import { stakeAddress } from "../../utils/contractMethods";
import { useAccount } from "wagmi";
import { fromWei } from "../../utils/mathHelpers";

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
  const stakedBalance = fromWei(useGetStakedBalance(userAddress));
  const totalRate = Math.round(
    (stakedBalance * totalAvailble) / totalSupply + stakedBalance
  );

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
    if (allowance < payload) {
      writeApprove({ args: [stakeAddress, payload] });
    } else writeStake({ args: [payload] });
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Stake</h2>
        <p className={s.page_rate}>
          Reward rate:
          <span> {totalRate ? totalRate : "0"} STRU/week</span>
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
        <Form className={s.page_form}>
          <label className={s.page_form_label}>
            <Input
              className={s.page_form_input}
              type="number"
              name="amount"
              placeholder="Enter stake amount"
              autoComplete="off"
            />
          </label>
          <p className={s.page_available}>
            Available: <span>{!isNaN(struToken) ? struToken : "0"}</span>
            <span> STRU</span>
          </p>
          {isLoading && <p className={s.page_available}>Loading</p>}
          <button className={s.page_form_btn} type="submit">
            Stake
          </button>
        </Form>
      </Formik>
    </div>
  );
};
