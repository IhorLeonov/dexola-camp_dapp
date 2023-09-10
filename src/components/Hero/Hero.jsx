import s from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={s.hero}>
      <h1 className={s.hero_title}>StarRunner Token staking</h1>
      <ul className={s.hero_info_list}>
        <li className={s.hero_info_item}>
          <span className={s.hero_accent_word}>0.00</span> STRU{" "}
          <span className={s.hero_info_desc}>Staked balance</span>
        </li>
        <li className={s.hero_info_item}>
          <span className={s.hero_accent_word}>≈8%</span> APY
        </li>
        <li className={s.hero_info_item}>
          <span className={s.hero_accent_word}>0</span> Days
        </li>
        <li className={s.hero_info_item}>
          <span className={s.hero_accent_word}>0</span> STRU Rewards
        </li>
      </ul>
    </section>
  );
};
