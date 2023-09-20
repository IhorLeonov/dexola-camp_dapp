import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [struToken, setStruToken] = useState(null);
  const [status, setStatus] = useState(null);

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
