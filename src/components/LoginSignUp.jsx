import React, { useCallback } from 'react';
import Form from 'components/Form';
import firebase from 'config/firebase';
import { withRouter, useHistory, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context/auth';

const LoginSignup = (props) => {
	let history = useHistory();
	const { type } = props;

	const handleLoginSignUp = useCallback(
		async (e) => {
			e.preventDefault();
			const { email, password } = e.target.elements;
			try {
				if (type === 'login') await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
				else await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);

	const { currentUser } = useContext(AuthContext);
	if (currentUser) return <Redirect to="/" />;

	return (
		<div className="screen-container">
			<div className={'content-box'}>
				<h3 className={'login-signup-title'}>
					{type === 'login' ? 'Login to your account' : 'Sign up for an account'}
				</h3>
				<Form
					onSubmit={handleLoginSignUp}
					inputs={[ 'email', 'password' ]}
					submitText={type === 'login' ? 'Log In' : 'Sign Up'}
				/>
				<a className={'login-signup-footer'} href={type === 'login' ? '/signup' : '/login'}>
					{type === 'login' ? 'Sign Up' : 'Log In'}
				</a>
			</div>
		</div>
	);
};

export default withRouter(LoginSignup);
