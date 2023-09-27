import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
// import { MyContext } from "../context/context";

const body = document.querySelector("body");

export const usePrompt = () => {
  // const { setPromptName, setPromptClass } = MyContext();
  const [promptName, setPromptName] = useState(null);
  const [promptClass, setPromptClass] = useState(null);

  const handleShowPrompt = (name) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    disableBodyScroll(body);
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    enableBodyScroll(body);
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
