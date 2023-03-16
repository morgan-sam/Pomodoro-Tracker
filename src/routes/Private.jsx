import React, { useContext } from "react";
import { AuthContext } from "context/auth";

const Private = ({ AuthComponent, DefaultComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <AuthComponent {...rest} /> : <DefaultComponent {...rest} />;
};

export default Private;
