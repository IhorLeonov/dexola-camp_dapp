import { createContext, useContext, useState } from "react";

const Context = createContext();

export const myContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logIn = () => {
    setIsLoggedIn(true);
    setUsername("Mango");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <Context.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </Context.Provider>
  );
};
