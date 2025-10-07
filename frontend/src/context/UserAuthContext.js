// frontend/src/context/UserAuthContext.js
import React, { createContext, useContext } from "react";
import useSessionState from "../hooks/useSessionState";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  // Persist login using session storage
  const [userLoggedIn, setUserLoggedIn, clearUserLoggedIn] = useSessionState("userLoggedIn", false);

  const userLogin = () => {
    setUserLoggedIn(true);
  };

  const userLogout = () => {
    clearUserLoggedIn(); // also clears from sessionStorage
  };

  return (
    <UserAuthContext.Provider value={{ userLoggedIn, userLogin, userLogout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
