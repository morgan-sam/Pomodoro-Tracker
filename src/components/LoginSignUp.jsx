import React from 'react';
import Form from 'components/Form';

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

const handleLogin = () => null;
const handleSignUp = () => null;

const LoginSignup = (props) => {
	const { type } = props;
	return (
		<div style={screenContainerStyle}>
			<div style={loginSignUpBoxStyle}>
				<h3 style={titleStyle}>{type === 'login' ? 'Login to your account' : 'Sign up for an account'}</h3>
				<Form
					onSubmit={type === 'login' ? handleLogin : handleSignUp}
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

export default LoginSignup;
