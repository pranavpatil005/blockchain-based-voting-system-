import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { adminLoggedIn } = useAuth();

  return adminLoggedIn ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
