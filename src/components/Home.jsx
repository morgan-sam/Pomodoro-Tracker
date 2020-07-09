import React, { createRef } from 'react';
import DownArrow from 'components/DownArrow';
import splash from 'img/splash.jpeg';
import terminal from 'img/terminal.gif';
import keyboard from 'img/keyboard.gif';

const homeStyle = {
	overflowX: 'hidden'
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

const homeSectionStyle = {
	position: 'relative',
	display: 'inline-flex',
	flexDirection: 'column',
	alignItems: 'center',
	textAlign: 'center',
	minWidth: '100vw',
	minHeight: '100vh',
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
	boxSizing: 'border-box',
	padding: '2rem'
};

const titleStyle = {
	padding: '1rem'
};

const Home = () => {
	const firstRef = createRef();
	const secondRef = createRef();
	const thirdRef = createRef();
	const fourthRef = createRef();

	const handleClicks = [ firstRef, secondRef, thirdRef, fourthRef ].map((el) => () =>
		el.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	);

	return (
		<div style={homeStyle}>
			<div style={homeSectionStyle} ref={firstRef}>
				<h1 style={titleStyle}>Pomodoro Tracker</h1>
				<div style={{ padding: '1rem' }}>
					<p style={{ padding: '0 0 2rem 0' }}>The simplest way to keep track of your pomodoros.</p>
					<img
						src={splash}
						style={{ height: '18rem', width: '35rem', border: '1px solid black', borderRadius: '10px' }}
					/>
				</div>
				<div style={{ padding: '1rem' }}>
					<p style={{ padding: '1rem' }}>One simple command line script. </p>
					<img src={terminal} style={{ height: '9rem', width: '18rem' }} />
				</div>
				<DownArrow type={'down'} onClick={handleClicks[1]} />
			</div>
			<div style={homeSectionStyle} ref={secondRef}>
				<h1 style={titleStyle}>Why</h1>
				<p>Because </p>
				<DownArrow type={'down'} onClick={handleClicks[2]} />
			</div>
			<div style={homeSectionStyle} ref={thirdRef}>
				<DownArrow type={'down'} onClick={handleClicks[3]} />
			</div>
			<div style={homeSectionStyle} ref={fourthRef}>
				END
			</div>
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
