import React from 'react';
import Main from 'components/Main';
import LoginSignUp from 'components/LoginSignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from 'context/auth';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Route exact path="/" component={Main} />
				<Route exact path="/login" render={(props) => <LoginSignUp type="login" {...props} />} />
				<Route exact path="/signup" render={(props) => <LoginSignUp type="signup" {...props} />} />
			</Router>
		</AuthProvider>
	);
};

export default App;
