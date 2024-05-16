import { useAuthentication } from "@/context/Authentication";
import { Navigate } from "react-router-dom";

export const AuthenticationGuard = ({ children }) => {
  const { token } = useAuthentication();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
