import s from "../pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { useAccount } from "wagmi";
import { useGetStakedBalance, useWithdraw } from "../../utils/contractMethods";
import { fromWei } from "../../utils/mathHelpers";
import { decimalWei } from "../../utils/mathHelpers";

export const Withdraw = () => {
  const { address: userAddress } = useAccount();
  const available = fromWei(useGetStakedBalance(userAddress));
  const { write } = useWithdraw();

  const handleSubmit = (amount) => {
    const payload = amount * decimalWei;
    write({ args: [payload] });
  };

  return (
    <div className={s.page}>
      <div className={s.page_header}>
        <h2 className={s.page_title}>Withdraw</h2>
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
            Available: <span>{available ? available : "0"}</span>
            <span> STRU</span>
          </p>
          <button className={s.page_form_btn} type="submit">
            Withdraw
          </button>
        </Form>
      </Formik>
    </div>
  );
};
