// src/context/UserAuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    setUserLoggedIn(loggedIn);
  }, []);

  const userLogin = () => {
    localStorage.setItem('userLoggedIn', 'true');
    setUserLoggedIn(true);
  };

  const userLogout = () => {
    localStorage.removeItem('userLoggedIn');
    setUserLoggedIn(false);
  };

  return (
    <UserAuthContext.Provider value={{ userLoggedIn, userLogin, userLogout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
