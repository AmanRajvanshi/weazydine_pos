import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { is_login } = React.useContext(AuthContext);

  if (!is_login) {
    // return <Navigate to="/login" state={{ path: location.pathname }} />;
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};
