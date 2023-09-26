import * as Yup from "yup";
import { MyContext } from "../context/context";

export const useStakeSchema = () => {
  const { struBalance } = MyContext();

  const stakeSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError("The value must be a number")
      .test(
        "inRange",
        `Must be in range 0.000001 to ${struBalance}`,
        function valueInRange(value) {
          return value >= 0.000001 && value <= struBalance;
        }
      )
      .required("Please complete this field!"),
  });
  return { stakeSchema };
};
