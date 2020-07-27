import React, { useState } from 'react';
import Main from 'screens/Main';
import Home from 'screens/Home';
import Settings from 'screens/Settings';
import AccountSettings from 'screens/AccountSettings';
import TimelineSettings from 'screens/TimelineSettings';
import Script from 'screens/Script';
import LoginSignUp from 'components/LoginSignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from 'context/auth';
import PrivateRoute from 'routes/PrivateRoute';
import AuthRedirectRoute from 'routes/AuthRedirectRoute';
import { defaultOptions } from 'data/defaultState';

const App = () => {
	const [ options, setOptions ] = useState(defaultOptions);
	return (
		<AuthProvider>
			<Router>
				<PrivateRoute
					exact
					path="/"
					AuthComponent={Main}
					DefaultComponent={Home}
					{...{ options, setOptions }}
				/>
				<Route exact path="/login" render={(props) => <LoginSignUp type="login" {...props} />} />
				<Route exact path="/signup" render={(props) => <LoginSignUp type="signup" {...props} />} />
				<AuthRedirectRoute
					exact
					path="/settings"
					AuthComponent={Settings}
					redirect={'/login'}
					{...{ options, setOptions }}
				/>
				<AuthRedirectRoute
					exact
					path="/settings/account"
					AuthComponent={AccountSettings}
					redirect={'/login'}
					{...{ options, setOptions }}
				/>
				<AuthRedirectRoute
					exact
					path="/settings/timeline"
					AuthComponent={TimelineSettings}
					redirect={'/login'}
					{...{ options, setOptions }}
				/>
				<AuthRedirectRoute
					exact
					path="/script"
					AuthComponent={Script}
					redirect={'/login'}
					{...{ options, setOptions }}
				/>
			</Router>
		</AuthProvider>
	);
};

export default App;