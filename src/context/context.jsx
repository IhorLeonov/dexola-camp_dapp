import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");
  const [struToken, setStruToken] = useState(0);
  const [status, setStatus] = useState("");

  return (
    <Context.Provider
      value={{
        struToken,
        setStruToken,
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
