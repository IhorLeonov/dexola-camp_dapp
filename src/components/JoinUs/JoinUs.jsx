import s from "./JoinUs.module.scss";
import { Title } from "../Title/Title";
import { JoinUsForm } from "./JoinUsForm";
import arrowIcon from "../../assets/icons/arrow-right-long.svg";

export const JoinUs = () => {
  return (
    <section id="join" className={s.join_section}>
      <Title name="Join Us" numb="03" />
      <div className={s.join}>
        <div className={s.join_wrapper}>
          <h3 className={s.join_title}>Experience the Power of StarRunner</h3>
          <p className={s.join_description}>
            Join Our Community and Embark on a Journey of Opportunities.
            Discover the full range of our services that cater to your needs.
            We&apos;ve got you covered with top-notch solutions.
          </p>
          <img className={s.join_arrow_img} src={arrowIcon} alt="Arrow right" />
        </div>
        <JoinUsForm />
      </div>
    </section>
  );
};
