import s from "./Hero.module.scss";
import { BtnHelp } from "./BtnHelp";

export const Hero = () => {
  return (
    <section className={s.hero}>
      <h1 className={s.hero_title}>StarRunner Token staking</h1>
      <ul className={s.hero_info_list}>
        <li>
          <span className={s.hero_accent_word}>0.00</span> STRU <BtnHelp />
          <span className={s.hero_info_desc}>Staked balance</span>
        </li>
        <li>
          <span className={s.hero_accent_word}>≈8%</span>
          <BtnHelp /> <span className={s.hero_info_desc}>APR</span>
        </li>
        <li>
          <span className={s.hero_accent_word}>0</span>{" "}
          <span className={s.hero_info_desc}>Days</span>
        </li>
        <li>
          <span className={s.hero_accent_word}>0</span> STRU <BtnHelp />
          <span className={s.hero_info_desc}>Rewards</span>
        </li>
      </ul>
    </section>
  );
};
