import s from "./Hero.module.scss";
import { QuestionMark } from "../QuestionMark/QuestionMark";
import { Prompt } from "../Prompt/Prompt";
import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export const Hero = () => {
  const [promptName, setPromptName] = useState(null);
  const [promptClass, setPromptClass] = useState(null);
  const body = document.querySelector("body");

  const handleShowPrompt = (name) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    disableBodyScroll(body);
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    enableBodyScroll(body);
  };

  return (
    <section id="hero" className={s.hero}>
      <h1 className={s.hero_title}>StarRunner Token staking</h1>
      <ul className={s.hero_info}>
        <li className={s.hero_info_balance}>
          <span className={s.hero_amount}>0.00</span>
          <span className={s.hero_stru}>STRU</span>{" "}
          <QuestionMark
            name="balance"
            onShowPrompt={handleShowPrompt}
            onHidePrompt={handleHidePrompt}
          />
          <span className={s.hero_info_desc}>Staked balance</span>
        </li>

        <li className={s.hero_info_apr}>
          <span className={s.hero_amount}>≈8%</span>
          <QuestionMark
            name="apr"
            onShowPrompt={handleShowPrompt}
            onHidePrompt={handleHidePrompt}
          />{" "}
          <span className={s.hero_info_desc}>APR</span>
        </li>

        <li className={s.hero_info_days}>
          <span className={s.hero_amount}>0</span>{" "}
          <span className={s.hero_info_desc}>Days</span>
        </li>

        <li className={s.hero_info_rewards}>
          <span className={s.hero_amount}>0</span>{" "}
          <span className={s.hero_stru}>STRU</span>{" "}
          <QuestionMark
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
    </section>
  );
};
