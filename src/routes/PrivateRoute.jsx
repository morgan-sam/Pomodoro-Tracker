import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'context/auth';

const PrivateRoute = ({ authComponent: AuthComponent, defaultComponent: DefaultComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				currentUser ? <AuthComponent {...routeProps} /> : <DefaultComponent {...routeProps} />}
		/>
	);
};

export default PrivateRoute;
