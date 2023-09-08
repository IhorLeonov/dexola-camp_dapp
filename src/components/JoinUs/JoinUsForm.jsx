import s from "./JoinUs.module.scss";
import { Formik } from "formik";
import { Form, Field as Input } from "formik";
import * as Yup from "yup";
import flagIcon from "../../assets/icons/flag-ukr.svg";
import { Icon } from "../../helpers/IconSelector";
import { useState } from "react";

const required = "Please complete this field.";
const schema = Yup.object().shape({
  email: Yup.string().email("Is not valid email.").trim().required(required),
  phone: Yup.string()
    .trim()
    .matches(/^\+?3?8?(0\d{9})$/, "Is not valid phone number.")
    .required(required),
  password: Yup.string()
    .trim()
    .min(6, "Password must be longer.")
    .max(16, "Password must be shorter.")
    .required(required),
  confirmPass: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Password mismatch.")
    .required(required),
});

export const JoinUsForm = () => {
  const handleSubmit = (email, phone, password, confirmPass) => {
    console.log({
      email,
      phone,
      password,
      confirmPass,
    });
  };

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", phone: "", password: "", confirmPass: "" }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        const { email, phone, password, confirmPass } = values;

        handleSubmit(email, phone, password, confirmPass);
        actions.resetForm();
      }}
    >
      {({ touched, errors }) => {
        // adding warning styles
        const warningInput = (inputName) => {
          return touched[inputName] && errors[inputName]
            ? " warning_input"
            : "";
        };
        // checking error existence
        const checkError = (inputName) => {
          return touched[inputName] && errors[inputName];
        };
        return (
          <Form className={s.join_form}>
            <label className={s.join_form_label}>
              <Input
                className={s.join_form_input + " " + warningInput("email")}
                type="email"
                name="email"
                placeholder="Enter email"
                autoComplete="off"
              />
              <span className={s.join_form_marker}>*</span>
              <div className={s.join_form_error_box}>
                {checkError("email") && (
                  <p className={s.join_form_error}>{errors.email}</p>
                )}
              </div>
            </label>

            <label className={s.join_form_label}>
              <Input
                className={s.join_form_input + " " + warningInput("phone")}
                type="text"
                name="phone"
                placeholder="+38(0__) ___ __ __"
                autoComplete="off"
              />
              <img
                className={s.join_form_flagicon}
                src={flagIcon}
                alt="Flag of Ukraine"
              />
              <div className={s.join_form_error_box}>
                {checkError("phone") && (
                  <p className={s.join_form_error}>{errors.phone}</p>
                )}
              </div>
            </label>

            <label className={s.join_form_label}>
              <Input
                className={s.join_form_input + " " + warningInput("password")}
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="off"
              />
              <span className={s.join_form_marker}>*</span>
              <button
                className={s.join_form_password_btn}
                type="button"
                onClick={() => setShowPass(!showPass)}
                name="Eye"
              >
                <Icon id={showPass ? "eye-open" : "eye-close"} />
              </button>
              <div className={s.join_form_error_box}>
                {checkError("password") && (
                  <p className={s.join_form_error}>{errors.password}</p>
                )}
              </div>
            </label>

            <label className={s.join_form_label}>
              <Input
                className={
                  s.join_form_input + " " + warningInput("confirmPass")
                }
                type={showConfirm ? "text" : "password"}
                name="confirmPass"
                placeholder="Confirm Password"
                autoComplete="off"
              />
              <span className={s.join_form_marker}>*</span>
              <button
                className={s.join_form_password_btn}
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                name="Eye"
              >
                <Icon id={showConfirm ? "eye-open" : "eye-close"} />
              </button>
              <div className={s.join_form_error_box}>
                {checkError("confirmPass") && (
                  <p className={s.join_form_error}>{errors.confirmPass}</p>
                )}
              </div>
            </label>

            <button className={s.join_form_btn} type="submit">
              Send it
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
