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

const blobColors = [ '#b590ca', '#f5cab3', '#f3ecb8', '#a8d3da' ];

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
				<div className="content-background-container">
					<div className="home content center spaced">
						<div>
							<p style={{ padding: '0 0 2rem 0' }}>The simplest way to keep track of your pomodoros.</p>
							<img
								src={splash}
								style={{
									height: '18rem',
									width: '35rem',
									border: '1px solid black',
									borderRadius: '10px'
								}}
							/>
						</div>
						<div>
							<p style={{ padding: '1rem' }}>One simple command line script. </p>
							<img src={terminal} style={{ height: '9rem', width: '18rem' }} />
						</div>
					</div>
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill={blobColors[0]}
							d="M33.9,-53.3C46.8,-51.3,62.2,-48,68.7,-38.9C75.2,-29.8,72.9,-14.9,71.5,-0.8C70.1,13.3,69.6,26.6,61.3,32.6C53,38.6,36.9,37.3,25.4,46.9C13.9,56.5,6.9,77,-3.6,83.3C-14.2,89.6,-28.4,81.6,-41.7,73.1C-55.1,64.5,-67.7,55.4,-76.4,43.2C-85.2,30.9,-90.1,15.4,-83.7,3.7C-77.4,-8.1,-59.7,-16.2,-47.5,-22.4C-35.2,-28.5,-28.3,-32.8,-21.3,-38.2C-14.2,-43.6,-7.1,-50.3,1.7,-53.2C10.5,-56.1,21,-55.4,33.9,-53.3Z"
							transform="translate(55 68) scale(0.75)"
						/>
					</svg>
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[1]} />
				</div>
			</div>

			{/* // */}

			<div className="home section" ref={secondRef}>
				<h1 className="home header center">Why</h1>
				<div className="content-background-container">
					<div className="home content center why-text">
						<h2>A pomodoro app without the bells and the whistles.</h2>
						<p>No loud noises. No complex setup.</p>
						<p>Open with a keystroke. Focus on your work.</p>
						<img src={timeline} />
					</div>
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill={blobColors[1]}
							d="M20.4,-29.7C26.3,-28,30.7,-22,41.8,-14.2C53,-6.4,70.8,3.2,75,14.5C79.2,25.9,69.7,39.1,57.5,45.5C45.2,52,30.2,51.7,18.5,48.4C6.9,45,-1.2,38.5,-12.7,37.7C-24.1,36.8,-38.8,41.6,-45.9,37.5C-53,33.4,-52.6,20.4,-56.1,7.1C-59.6,-6.3,-67,-20.1,-63.7,-29.8C-60.4,-39.5,-46.4,-45,-34,-43.8C-21.7,-42.5,-10.8,-34.5,-1.8,-31.7C7.3,-28.9,14.6,-31.5,20.4,-29.7Z"
							transform="translate(60 100) scale(-1,1.2)"
						/>
					</svg>
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[2]} />
				</div>
			</div>

			<div className="home section" ref={thirdRef}>
				<h1 className="home header center">How</h1>
				<div className="content-background-container">
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
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
						<path
							fill={blobColors[2]}
							d="M41.5,-14.1C54.6,-1.2,66.7,22.2,59.6,39.6C52.6,57.1,26.3,68.6,12.9,61.2C-0.5,53.8,-1,27.3,-7.2,10.4C-13.4,-6.5,-25.2,-13.9,-24.9,-19.4C-24.7,-24.9,-12.3,-28.5,0.9,-29C14.2,-29.6,28.3,-27.1,41.5,-14.1Z"
							transform="translate(101.8 100)"
						/>
					</svg>
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
							fill={blobColors[3]}
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
