import React from 'react';
import Main from 'components/Main';
import Home from 'components/Home';
import Settings from 'components/Settings';
import LoginSignUp from 'components/LoginSignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from 'context/auth';
import PrivateRoute from 'routes/PrivateRoute';
import AuthRedirectRoute from 'routes/AuthRedirectRoute';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<PrivateRoute exact path="/" AuthComponent={Main} DefaultComponent={Home} />
				<Route exact path="/login" render={(props) => <LoginSignUp type="login" {...props} />} />
				<Route exact path="/signup" render={(props) => <LoginSignUp type="signup" {...props} />} />
				<AuthRedirectRoute exact path="/settings" AuthComponent={Settings} redirect={'/login'} />
			</Router>
		</AuthProvider>
	);
};

export default App;
