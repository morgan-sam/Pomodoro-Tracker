import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "context/auth";

const Redirect = ({ AuthComponent, redirect, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <AuthComponent {...rest} /> : <Navigate to={redirect} />;
};

export default Redirect;
