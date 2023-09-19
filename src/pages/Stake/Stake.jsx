import s from "./Stake.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { MyContext } from "../../context/context";
// import { useState } from "react";s
import { useStake } from "../../utils/contractMethods";

export const Stake = () => {
  const { struToken } = MyContext();
  // const [stakeAmount, setStakeAmount] = useState();
  const { write } = useStake();

  const handleSubmit = (amount) => {
    write({ args: [amount] });
  };

  return (
    <div className={s.stake}>
      <div className={s.stake_header}>
        <h2 className={s.stake_title}>Stake</h2>
        <p className={s.stake_rate}>
          Reward rate:
          <span>1 STRU/week</span>
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
        <Form className={s.stake_form}>
          <label className={s.stake_form_label}>
            <Input
              className={s.stake_form_input}
              type="number"
              name="amount"
              placeholder="Enter stake amount"
              autoComplete="off"
            />
          </label>
          <p className={s.stake_available}>
            Available: <span>{struToken}</span>
            <span> STRU</span>
          </p>
          <button className={s.stake_form_btn} type="submit">
            Stake
          </button>
        </Form>
      </Formik>
    </div>
  );
};
