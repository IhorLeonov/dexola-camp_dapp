import s from "./Pages.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { useAccount } from "wagmi";
import {
  useGetStakedBalance,
  useGetUserRewards,
} from "../../utils/contractRead";
import { useEffect } from "react";
import {
  useWithdraw,
  useWaitForWithdraw,
  useTakeAll,
  useWaitTakeAll,
} from "../../utils/contractWrite";
import { fromWei } from "../../utils/mathHelpers";
import { decimalWei } from "../../utils/mathHelpers";
import { MyContext } from "../../context/context";
import { Loader } from "../Loader/Loader";

export const Withdraw = () => {
  const { setIsLoadingTransaction, setPayload } = MyContext();
  const { address: userAddress } = useAccount();
  const available = fromWei(useGetStakedBalance(userAddress));
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
    setPayload(available * decimalWei + userRewards);
    takeAllWrite();
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
      <div className={s.withdrow_buttons_box}>
        <button
          form="form"
          className={s.page_form_btn + " " + s.withdraw_btn}
          type="submit"
          disabled={withdrawIsLoading || takeAllIsLoading}
        >
          {withdrawIsLoading || takeAllIsLoading ? (
            <Loader width={24} />
          ) : (
            "Withdraw"
          )}
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
