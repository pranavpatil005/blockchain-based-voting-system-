import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const UserPrivateRoute = () => {
  const { userLoggedIn } = useUserAuth();

   return userLoggedIn ? <Outlet /> : <Navigate to="/voter/login" replace />;
};

export default UserPrivateRoute;
