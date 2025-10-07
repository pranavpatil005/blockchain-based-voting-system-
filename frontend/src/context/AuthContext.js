import { createContext, useContext } from 'react';
import useSessionState from '../hooks/useSessionState';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Use session storage to persist admin login
  const [adminLoggedIn, setAdminLoggedIn, clearAdminLoggedIn] = useSessionState('adminLoggedIn', false);

  const login = () => setAdminLoggedIn(true);
  const logout = () => clearAdminLoggedIn();

  return (
    <AuthContext.Provider value={{ adminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
