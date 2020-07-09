import React from 'react';

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
	alignItems: 'center',
	justifyContent: 'center',
	height: '20%',
	width: '30%',
	border: '1px solid #444',
	borderRadius: '1rem',
	backgroundColor: '#f4f4f4'
};

const Login = () => {
	return (
		<div style={screenContainerStyle}>
			<div style={loginSignUpBoxStyle}>Login</div>
		</div>
	);
};

export default Login;
