import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");
  const [struBalance, setStruBalance] = useState(0);
  const [status, setStatus] = useState("");
  const [isLoadingTransaction, setIsLoadingTransaction] = useState("");
  const [payload, setPayload] = useState(0); // amount of token for transaction

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
