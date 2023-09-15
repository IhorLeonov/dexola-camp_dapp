import sprite from "../assets/icons/sprite.svg";

export const Icon = ({ id }) => {
  switch (id) {
    case "logo":
      return (
        <svg className="svg" width={34.5} height={19.5}>
          <use href={sprite + "#logo"}></use>
        </svg>
      );
    case "eye-close":
      return (
        <svg className="svg" width={24} height={24}>
          <use href={sprite + "#eye-close"}></use>
        </svg>
      );
    case "eye-open":
      return (
        <svg className="svg" width={24} height={24}>
          <use href={sprite + "#eye-open"}></use>
        </svg>
      );
    default:
      return;
  }
};
