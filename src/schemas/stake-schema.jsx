import * as Yup from "yup";
import { MyContext } from "../context/context";

export const useStakeSchema = () => {
  const { struBalance } = MyContext();

  const stakeSchema = Yup.object().shape({
    amount: Yup.number()
      .test(
        "inRange",
        `Must be in range 0.000001 to ${struBalance}`,
        (value) => value >= 0.000001 && value <= struBalance
      )
      .test("isNumber", "The value must be a number", (value) =>
        /^\d*.?\d{0,18}$/.test(value)
      )
      .max(20)
      .required("Please complete this field!"),
  });
  return { stakeSchema };
};
