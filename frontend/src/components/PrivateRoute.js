import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { adminLoggedIn } = useAuth();

  return adminLoggedIn ? <Outlet /> : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
