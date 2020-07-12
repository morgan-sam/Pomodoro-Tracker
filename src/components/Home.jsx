import React, { createRef, useState } from 'react';
import DownArrow from 'components/DownArrow';
import splash from 'img/splash.jpeg';
import terminal from 'img/terminal.gif';
import timeline from 'img/timeline.png';
import bash from 'img/bash.svg';
import python from 'img/python.svg';
import keyboard from 'img/keyboard.gif';
import terminal_dark from 'img/terminal_dark.gif';
import graph from 'img/graph.png';

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

const getLoginSignUpBtnStyle = (hover) => {
	return {
		padding: '0.5rem 1rem',
		marginLeft: '1rem',
		textDecoration: 'none',
		border: '1px solid #444',
		borderRadius: '5px',
		backgroundColor: hover ? '#00BCD4' : 'white',
		color: hover ? 'white' : 'black'
	};
};

const homeSectionStyle = {
	position: 'relative',
	display: 'inline-flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	minWidth: '100vw',
	minHeight: '100vh',
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
	boxSizing: 'border-box',
	padding: '2rem'
};

const gridSubContainer = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
};

const titleStyle = {
	margin: '5rem 0',
	position: 'absolute',
	top: '0'
};

const Home = () => {
	const [ hovered, setHovered ] = useState('');

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
				<div style={{ textAlign: 'left' }}>
					<h2>A pomodoro app without the bells and the whistles.</h2>
					<p>No loud noises. No complex setup.</p>
					<p>Open with a keystroke. Focus on your work.</p>
					<img src={timeline} />
				</div>
				<DownArrow type={'down'} onClick={handleClicks[2]} />
			</div>
			<div style={homeSectionStyle} ref={thirdRef}>
				<h1 style={titleStyle}>How</h1>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gridTemplateRows: 'repeat(2, auto)',
						gridGap: '2rem'
					}}
				>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Sign up and download a pomodoro script.</p>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '12rem'
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column'
								}}
							>
								<img src={bash} style={{ height: '4rem', padding: '0.5rem' }} />
								<span style={{ fontSize: '0.8rem' }}>pomodoro.sh</span>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<img src={python} style={{ height: '4rem', padding: '0.5rem' }} />
								<span style={{ fontSize: '0.8rem' }}>pomodoro.py</span>
							</div>
						</div>
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Assign to a keyboard shortcut.</p>
						<img src={keyboard} style={{ height: '9rem' }} />
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Run the script and get to work. </p>
						<img src={terminal_dark} style={{ height: '9rem', width: '18rem' }} />
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>View your performance on the web app. </p>
						<img src={graph} style={{ height: '14rem', borderRadius: '1rem' }} />
					</div>
				</div>
				<DownArrow type={'down'} onClick={handleClicks[3]} />
			</div>
			<div style={homeSectionStyle} ref={fourthRef}>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<a
						href="/signup"
						style={{
							fontSize: '2rem',
							color: '#fff',
							border: '2px solid #26C6DA',
							padding: '0.75rem 1.5rem',
							borderRadius: '10px',
							textDecoration: 'none',
							backgroundColor: '#4DD0E1',
							boxShadow: '0.4rem 0.4rem #00ACC1'
						}}
					>
						Get Started
					</a>
				</div>
			</div>
			<div style={loginSignUpBtnContainerStyle}>
				<a
					onMouseOver={() => setHovered('signup')}
					onMouseLeave={() => setHovered('')}
					href="/signup"
					style={getLoginSignUpBtnStyle(hovered === 'signup')}
				>
					Sign Up
				</a>
				<a
					onMouseOver={() => setHovered('login')}
					onMouseLeave={() => setHovered('')}
					href="/login"
					style={getLoginSignUpBtnStyle(hovered === 'login')}
				>
					Log In
				</a>
			</div>
		</div>
	);
};

export default Home;
