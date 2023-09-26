import * as Yup from "yup";

export const yupSchema = (balance) => {
  const schema = Yup.object().shape({
    amount: Yup.number()
      .test(
        "inRange",
        `Must be in range between 0.000001 and ${balance} STRU`,
        (value) => value >= 0.000001 && value <= balance
      )
      .required("Please complete this field"),
  });
  return { schema };
};
