import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const auth = useAuth();

  if(auth.currentUser === null)
    return <Navigate to="sign-in" />

  return <Outlet />
}

export default PrivateRoute