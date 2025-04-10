import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = (props: AuthGuardProps) => {
  const users = useSelector(
    (state: { users: { auth: boolean } }) => state.users
  );
  const location = useLocation();

  if (!users.auth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return props.children;
};

export default AuthGuard;
