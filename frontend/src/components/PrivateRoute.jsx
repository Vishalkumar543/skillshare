import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // JWT token check
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;