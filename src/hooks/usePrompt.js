import { useState } from "react";

export const usePrompt = () => {
  const [promptName, setPromptName] = useState(null);
  const [promptClass, setPromptClass] = useState(null);

  const handleShowPrompt = (name) => {
    setPromptName(name);
    setPromptClass(`${name}_prompt`);
    document.body.style.overflow = "hidden";
  };

  const handleHidePrompt = () => {
    setPromptName(null);
    setPromptClass(null);
    document.body.style.overflow = "scroll";
  };

  return {
    promptName,
    promptClass,
    handleShowPrompt,
    handleHidePrompt,
  };
};
