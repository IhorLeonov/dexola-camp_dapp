import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");
  const [struBalance, setStruBalance] = useState(0);
  const [status, setStatus] = useState("");

  return (
    <Context.Provider
      value={{
        struBalance,
        setStruBalance,
        status,
        setStatus,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </Context.Provider>
  );
};
