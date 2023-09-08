import styles from "./Title.module.scss";

export const Title = ({ name, numb }) => {
  return (
    <>
      <h2 className={styles.title}>
        <span>{name}</span>
        <span>{numb}</span>
      </h2>
      <hr className={styles.title_underline} />
    </>
  );
};
