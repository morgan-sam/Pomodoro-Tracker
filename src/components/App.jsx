import React from 'react';
import Main from 'components/Main';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Main} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
			</div>
		</Router>
	);
};

export default App;
