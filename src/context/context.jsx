import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");
  const [struBalance, setStruBalance] = useState(0);
  const [status, setStatus] = useState("");
  const [isLoadingTransaction, setIsLoadingTransaction] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [payload, setPayload] = useState(0);
  const [promptName, setPromptName] = useState(null);
  const [promptClass, setPromptClass] = useState(null);

  return (
    <Context.Provider
      value={{
        struBalance,
        setStruBalance,
        status,
        setStatus,
        userAddress,
        setUserAddress,
        isLoadingTransaction,
        setIsLoadingTransaction,
        payload,
        setPayload,
        inputValue,
        setInputValue,
        promptName,
        setPromptName,
        promptClass,
        setPromptClass,
      }}
    >
      {children}
    </Context.Provider>
  );
};
