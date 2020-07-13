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
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '12rem'
							}}
						>
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
				<div
					className="home content center"
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
