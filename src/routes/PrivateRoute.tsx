import { useAuthContext } from "../context/AuthContext/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { user } = useAuthContext();

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
