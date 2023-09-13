import s from "./Hero.module.scss";
import { QuestionMark } from "./QuestionMark";
import { Prompt } from "../Prompt/Prompt";
import { useState } from "react";

export const Hero = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptName, setPromptName] = useState("");
  const [promptClass, setPromptClass] = useState(null);

  const handleShowPrompt = (name) => {
    setShowPrompt(!showPrompt);
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
  };

  return (
    <section className={s.hero}>
      <h1 className={s.hero_title}>StarRunner Token staking</h1>
      <ul className={s.hero_info}>
        <li className={s.hero_info_balance}>
          <span className={s.hero_amount}>0.00</span>
          <span className={s.hero_stru}>STRU</span>{" "}
          <QuestionMark name="balance" handler={handleShowPrompt} />
          <span className={s.hero_info_desc}>Staked balance</span>
        </li>

        <li className={s.hero_info_apr}>
          <span className={s.hero_amount}>≈8%</span>
          <QuestionMark name="apr" handler={handleShowPrompt} />{" "}
          <span className={s.hero_info_desc}>APR</span>
        </li>

        <li className={s.hero_info_days}>
          <span className={s.hero_amount}>0</span>{" "}
          <span className={s.hero_info_desc}>Days</span>
        </li>

        <li className={s.hero_info_rewards}>
          <span className={s.hero_amount}>0</span>{" "}
          <span className={s.hero_stru}>STRU</span>{" "}
          <QuestionMark name="rewards" handler={handleShowPrompt} />
          <span className={s.hero_info_desc}>Rewards</span>
        </li>
      </ul>
      {/* {showPrompt && ( */}
      <Prompt
        promptClass={promptClass}
        name={promptName}
        handler={handleShowPrompt}
      />
      {/* )} */}
    </section>
  );
};
