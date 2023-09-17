import { createContext, useContext, useState } from "react";

const Context = createContext();

export const MyContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

  return (
    <Context.Provider value={{ address, setAddress }}>
      {children}
    </Context.Provider>
  );
};
