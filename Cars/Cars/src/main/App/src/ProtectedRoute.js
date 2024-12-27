import React from "react";
import { Navigate } from "react-router-dom";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const ProtectedRoute = ({ children, requiredRole }) => {
    
  const user = getUserFromLocalStorage();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
