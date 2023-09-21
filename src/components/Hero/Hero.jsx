import s from "./Hero.module.scss";
import { HelpBtn } from "../HelpBtn/HelpBtn";
import { Prompt } from "../Prompt/Prompt";
import { usePrompt } from "../../hooks/usePrompt";
import { useAccount } from "wagmi";
import { calcPercent, calcEndingTime } from "../../utils/mathHelpers";
import { fromWei } from "../../utils/mathHelpers";
// import { MyContext } from "../../context/context";

import {
  useGetStakedBalance,
  useGetNumberOfRewards,
  useGetTotalAmountOfStakes,
  useGetTimeStampOfTheEnd,
  useGetUserRewards,
} from "../../utils/contractMethods";

export const Hero = () => {
  // const { userAddress } = MyContext();
  const { promptName, promptClass, handleShowPrompt, handleHidePrompt } =
    usePrompt();

  const { address } = useAccount();
  const numberOfRewards = useGetNumberOfRewards();
  const totalAmount = useGetTotalAmountOfStakes();
  const timeStamp = useGetTimeStampOfTheEnd();

  const stakedBalance = fromWei(useGetStakedBalance(address));
  const percent = calcPercent(numberOfRewards, totalAmount);
  const completionTime = calcEndingTime(timeStamp);
  const userRewards = fromWei(useGetUserRewards(address)).toFixed(1);

  return (
    <section className={s.hero}>
      <div className={s.hero_container}>
        <h1 className={s.hero_title}>StarRunner Token staking</h1>
        <ul className={s.hero_info}>
          <li className={s.hero_info_balance}>
            <span className={s.hero_amount}>
              {stakedBalance ? stakedBalance : "0.00"}
            </span>
            <span className={s.hero_stru}>STRU</span>{" "}
            <HelpBtn
              name="balance"
              onShowPrompt={handleShowPrompt}
              onHidePrompt={handleHidePrompt}
            />
            <span className={s.hero_info_desc}>Staked balance</span>
          </li>

          <li className={s.hero_info_apr}>
            <span className={s.hero_amount}>≈{percent ? percent : "0"}%</span>{" "}
            <HelpBtn
              name="apr"
              onShowPrompt={handleShowPrompt}
              onHidePrompt={handleHidePrompt}
            />
            <span className={s.hero_info_desc}>APR</span>
          </li>

          <li className={s.hero_info_days}>
            <span className={s.hero_amount}>
              {completionTime ? completionTime : "0"}
            </span>{" "}
            <span className={s.hero_info_desc}>Days</span>
          </li>

          <li className={s.hero_info_rewards}>
            <span className={s.hero_amount}>
              {!isNaN(userRewards) ? userRewards : "0"}
            </span>{" "}
            <span className={s.hero_stru}>STRU</span>{" "}
            <HelpBtn
              name="rewards"
              onShowPrompt={handleShowPrompt}
              onHidePrompt={handleHidePrompt}
            />
            <span className={s.hero_info_desc}>Rewards</span>
          </li>
        </ul>
        <Prompt
          promptClass={promptClass}
          name={promptName}
          onHidePrompt={handleHidePrompt}
        />
      </div>
    </section>
  );
};
