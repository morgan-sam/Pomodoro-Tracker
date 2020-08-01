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

import FileIcon from 'components/FileIcon';

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

const gridSubContainer = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
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
			<div className="home section" ref={firstRef}>
				<h1 className="home header center">Pomodoro Tracker</h1>
				<div className="home content center spaced">
					<div>
						<p style={{ padding: '0 0 2rem 0' }}>The simplest way to keep track of your pomodoros.</p>
						<img
							src={splash}
							style={{ height: '18rem', width: '35rem', border: '1px solid black', borderRadius: '10px' }}
						/>
					</div>
					<div>
						<p style={{ padding: '1rem' }}>One simple command line script. </p>
						<img src={terminal} style={{ height: '9rem', width: '18rem' }} />
					</div>
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[1]} />
				</div>
			</div>

			{/* // */}

			<div className="home section" ref={secondRef}>
				<h1 className="home header center">Why</h1>
				<div className="home content center why-text">
					<h2>A pomodoro app without the bells and the whistles.</h2>
					<p>No loud noises. No complex setup.</p>
					<p>Open with a keystroke. Focus on your work.</p>
					<img src={timeline} />
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[2]} />
				</div>
			</div>

			{/* // */}

			<div className="home section" ref={thirdRef}>
				<h1 className="home header center">How</h1>
				<div className="home content center how-grid">
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Sign up and download a pomodoro script.</p>
						<div className="icons">
							<FileIcon icon={bash} text={'pomodoro.sh'} />
							<FileIcon icon={python} text={'pomodoro.py'} />
						</div>
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Assign to a keyboard shortcut.</p>
						<img src={keyboard} className="keyboard" />
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>Run the script and get to work. </p>
						<img src={terminal_dark} className="terminal_dark" />
					</div>
					<div style={gridSubContainer}>
						<p style={{ padding: '1rem' }}>View your performance on the web app. </p>
						<img src={graph} className="graph" />
					</div>
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[3]} />
				</div>
			</div>
			<div className="home section" ref={fourthRef}>
				<div className="content-background-container">
					<div className="home content ">
						<a href="/signup" className="get-started-button">
							Get Started
						</a>
					</div>
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill="#D8F2F5"
							d="M45.3,-51.5C55.3,-45.6,57.6,-28.1,61.7,-10.1C65.9,8,72,26.5,65.5,38C59.1,49.5,40.2,54.1,21.9,61.1C3.6,68.1,-14.1,77.7,-28.3,74.1C-42.4,70.5,-53.1,53.6,-59.5,37C-66,20.4,-68.1,4,-62.8,-8.5C-57.5,-20.9,-44.7,-29.5,-33,-35.1C-21.3,-40.7,-10.6,-43.4,3.5,-47.6C17.7,-51.7,35.3,-57.4,45.3,-51.5Z"
							transform="translate(100 90)"
						/>
					</svg>
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
