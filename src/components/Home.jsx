import React from 'react';
import splash from 'img/splash.jpeg';

const homeStyle = {
	display: 'flex',
	flexDirection: 'column',
	width: '100vw',
	height: '100vh',
	alignItems: 'center',
	boxSizing: 'border-box',
	padding: '5rem'
};

const loginSignUpBtnContainerStyle = {
	position: 'absolute',
	top: '0',
	right: '0',
	margin: '1rem 0.5rem',
	padding: '1rem'
};

const loginSignUpBtnStyle = {
	padding: '0.5rem 1rem',
	marginLeft: '1rem',
	textDecoration: 'none',
	border: '1px solid #444',
	borderRadius: '5px'
};

const Home = () => {
	return (
		<div style={homeStyle}>
			<h1>Pomodoro Tracker</h1>
			<p>The simplest way to keep track of your pomodoros.</p>
			<img src={splash} style={{ height: '25rem' }} />

			<div style={loginSignUpBtnContainerStyle}>
				<a href="/signup" style={loginSignUpBtnStyle}>
					Sign Up
				</a>
				<a href="/login" style={loginSignUpBtnStyle}>
					Log In
				</a>
			</div>
		</div>
	);
};

export default Home;
