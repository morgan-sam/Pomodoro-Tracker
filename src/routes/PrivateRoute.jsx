import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "context/auth";

const PrivateRoute = ({ AuthComponent, DefaultComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? (
          <AuthComponent {...routeProps} {...rest} />
        ) : (
          <DefaultComponent {...routeProps} />
        )
      }
    />
  );
};

export default PrivateRoute;
