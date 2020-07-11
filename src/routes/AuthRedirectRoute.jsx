import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const PrivateRoute = ({ authComponent: AuthComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) => (currentUser ? <AuthComponent {...routeProps} /> : <Redirect to={'/login'} />)}
		/>
	);
};

export default PrivateRoute;
