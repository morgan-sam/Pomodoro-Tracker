import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const AuthRedirectRoute = ({ authComponent: AuthComponent, redirect, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) => (currentUser ? <AuthComponent {...routeProps} /> : <Redirect to={redirect} />)}
		/>
	);
};

export default AuthRedirectRoute;
