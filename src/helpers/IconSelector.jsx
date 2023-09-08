// svg-sprite method.
import sprite from "../assets/icons/sprite.svg";

export const Icon = ({ id }) => {
  switch (id) {
    case "logo":
      return (
        <svg className="svg" width={34.5} height={19.5}>
          <use href={sprite + "#logo"}></use>
        </svg>
      );
    case "discord":
      return (
        <svg className="svg" width={32} height={32}>
          <use href={sprite + "#discord"}></use>
        </svg>
      );
    case "facebook":
      return (
        <svg className="svg" width={32} height={32}>
          <use href={sprite + "#facebook"}></use>
        </svg>
      );
    case "instagram":
      return (
        <svg className="svg" width={32} height={32}>
          <use href={sprite + "#instagram"}></use>
        </svg>
      );
    case "telegram":
      return (
        <svg className="svg" width={32} height={32}>
          <use href={sprite + "#telegram"}></use>
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

// Import svg as ReactComponent method.
// Esier, less code, but has some problems with svg styling.
// If you needn't hover you shuold use it.

// import { ReactComponent as Discord } from "../../assets/icons/socials/discord.svg";
// import { ReactComponent as Facebook } from "../../assets/icons/socials/facebook.svg";
// import { ReactComponent as Instagram } from "../../assets/icons/socials/instagram.svg";
// import { ReactComponent as Telegram } from "../../assets/icons/socials/telegram.svg";

// export const IconSelector = ({ id }) => {
//   switch (id) {
//     case "discord":
//       return <Discord />;
//     case "facebook":
//       return <Facebook />;
//     case "instagram":
//       return <Instagram />;
//     case "telegram":
//       return <Telegram />;
//     default:
//       return;
//   }
// };
