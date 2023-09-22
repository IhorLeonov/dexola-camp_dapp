import s from "./Pages.module.scss";
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
        <Form id="form" className={s.page_form}>
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
              {available ? available : "0"}
            </span>
            <span> STRU</span>
          </p>
        </Form>
      </Formik>
      <button
        form="form"
        className={s.page_form_btn + " " + s.withdraw_btn}
        type="submit"
      >
        Withdraw
      </button>
    </div>
  );
};
