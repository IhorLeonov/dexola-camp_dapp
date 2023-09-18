import s from "./Hero.module.scss";
import { HelpBtn } from "../HelpBtn/HelpBtn";
import { Prompt } from "../Prompt/Prompt";
import { usePrompt } from "../../hooks/usePrompt";
import { useAccount } from "wagmi";

import {
  useGetStakedBalance,
  useGetNumberOfRewards,
  useGetTotalAmountOfStakes,
  useGetTimeStampOfTheEnd,
} from "../../utils/contractRead";

export const Hero = () => {
  const { promptName, promptClass, handleShowPrompt, handleHidePrompt } =
    usePrompt();

  const { address } = useAccount();

  const numberOfRewards = useGetNumberOfRewards();
  const totalAmountOfStakes = useGetTotalAmountOfStakes();

  const stru = useGetStakedBalance(address);
  const apr = Math.round((numberOfRewards * 100) / totalAmountOfStakes);

  const timestamp = useGetTimeStampOfTheEnd();
  const dateNow = Date.now() / 1000;
  const oneDay = 86400;
  const completionTime = Math.round((timestamp - dateNow) / oneDay);

  return (
    <section className={s.hero}>
      <div className={s.hero_container}>
        <h1 className={s.hero_title}>StarRunner Token staking</h1>
        <ul className={s.hero_info}>
          <li className={s.hero_info_balance}>
            <span className={s.hero_amount}>{stru ? stru : "0.00"}</span>
            <span className={s.hero_stru}>STRU</span>{" "}
            <HelpBtn
              name="balance"
              onShowPrompt={handleShowPrompt}
              onHidePrompt={handleHidePrompt}
            />
            <span className={s.hero_info_desc}>Staked balance</span>
          </li>

          <li className={s.hero_info_apr}>
            <span className={s.hero_amount}>{apr ? "≈" + apr + "%" : "0"}</span>{" "}
            <span className={s.hero_info_desc}>APR</span>
            <HelpBtn
              name="apr"
              onShowPrompt={handleShowPrompt}
              onHidePrompt={handleHidePrompt}
            />
          </li>

          <li className={s.hero_info_days}>
            <span className={s.hero_amount}>
              {completionTime ? completionTime : 0}
            </span>{" "}
            <span className={s.hero_info_desc}>Days</span>
          </li>

          <li className={s.hero_info_rewards}>
            <span className={s.hero_amount}>0</span>{" "}
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
