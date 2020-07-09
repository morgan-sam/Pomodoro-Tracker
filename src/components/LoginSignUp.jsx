import React, { useCallback } from 'react';
import Form from 'components/Form';
import firebase from 'config/firebase';
import { withRouter, useHistory } from 'react-router-dom';

const titleStyle = {
	padding: '1rem'
};

const screenContainerStyle = {
	position: 'absolute',
	left: '0',
	top: '0',
	width: '100vw',
	height: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

const loginSignUpBoxStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: 'fit-content',
	width: 'fit-content',
	border: '1px solid #444',
	borderRadius: '1rem',
	backgroundColor: '#F1F8E9',
	padding: '2rem 3rem'
};

const footerLinkStyle = {
	padding: '1.4rem'
};

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

	return (
		<div style={screenContainerStyle}>
			<div style={loginSignUpBoxStyle}>
				<h3 style={titleStyle}>{type === 'login' ? 'Login to your account' : 'Sign up for an account'}</h3>
				<Form
					onSubmit={handleLoginSignUp}
					inputs={[ 'email', 'password' ]}
					submitText={type === 'login' ? 'Log In' : 'Sign Up'}
				/>
				<a style={footerLinkStyle} href={type === 'login' ? '/signup' : '/login'}>
					{type === 'login' ? 'Sign Up' : 'Log In'}
				</a>
			</div>
		</div>
	);
};

export default withRouter(LoginSignup);
