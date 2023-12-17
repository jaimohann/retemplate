import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useApp } from "./Context/Application";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
