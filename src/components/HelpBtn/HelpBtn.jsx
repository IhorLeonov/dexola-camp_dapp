import s from "./HelpBtn.module.scss";
import { Prompt } from "../Prompt/Prompt";
import { useState } from "react";

export const HelpBtn = ({
  name,
  handleShowPrompt,
  handleHidePrompt,
  promptName,
  promptClass,
}) => {
  const [open, setOpen] = useState(false);

  const handleShow = () => {
    if (!open) {
      handleShowPrompt(name);
      setOpen(true);
    }
    if (open) {
      handleHidePrompt();
      setOpen(false);
    }
  };

  return (
    <div
      type="button"
      className={s.help_btn}
      onMouseEnter={() => handleShowPrompt(name)}
      onClick={handleShow}
      onMouseLeave={handleHidePrompt}
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
      {promptName === name && (
        <Prompt promptClass={promptClass} name={promptName} />
      )}
    </div>
  );
};
