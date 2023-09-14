import s from "./QuestionMark.module.scss";

export const QuestionMark = ({ name, onShowPrompt, onHidePrompt }) => {
  return (
    <div
      className={s.question_mark}
      onMouseEnter={() => onShowPrompt(name)}
      onTouchStart={() => onShowPrompt(name)}
      onClick={() => onShowPrompt(name)}
      onMouseLeave={onHidePrompt}
    >
      <svg
        className={s.question_icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 13 13"
        fill="none"
      >
        <path
          d="M4.781 5.067a1.6 1.6 0 0 1 3.11.533c0 1.067-1.6 1.6-1.6 1.6m.042 2.133h.006m5.328-2.666A5.333 5.333 0 1 1 1 6.667a5.333 5.333 0 0 1 10.667 0Z"
          stroke="#B3B3B3"
          strokeWidth=".965"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
