import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setAdminLoggedIn(loggedIn);
  }, []);

  const login = () => {
    localStorage.setItem('adminLoggedIn', 'true');
    setAdminLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    setAdminLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ adminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
