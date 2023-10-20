import s from "./TransactionsForm.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import { yupSchema } from "../../helpers/yupSchema";
import { useAppContext } from "../../context/context";

// disable change input value on scroll
document.addEventListener("wheel", function () {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});

export const TransactionsForm = ({ handleSubmit, balance, handleInput }) => {
  const { setInputValue } = useAppContext();
  const { schema } = yupSchema(balance);

  return (
    <Formik
      initialValues={{ amount: "" }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const { amount } = values;
        handleSubmit(amount);
        actions.resetForm();
      }}
    >
      {({ touched, errors }) => {
        const warningStyles = () => {
          return touched.amount && errors.amount ? s.input_warning : "";
        };
        return (
          <Form
            id="form"
            className={s.form}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setInputValue(0)}
          >
            <Input
              className={s.form_input + " " + warningStyles()}
              type="number"
              name="amount"
              placeholder="Enter stake amount"
              autoComplete="off"
              min="0.000001"
              step="0.000001"
            />
            <div className={s.form_error_box}>
              {touched.amount && errors.amount && (
                <p className={s.form_error}>{errors.amount}</p>
              )}
            </div>
            <p className={s.form_available}>
              Available:{" "}
              <span className={s.form_available_value}>
                {balance ? balance : "0"}{" "}
              </span>
              <span> STRU</span>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};
