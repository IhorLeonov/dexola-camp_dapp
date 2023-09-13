import styles from "./Header.module.scss";
import { Icon } from "../../helpers/IconSelector";
import { Hero } from "../Hero/Hero";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <a href="https://dexola.com/" target="_blank" rel="noreferrer">
          <Icon id="logo" />
        </a>
        <button className={styles.header_btn} type="button">
          Connect wallet
        </button>
      </div>
      <Hero />
    </header>
  );
};
