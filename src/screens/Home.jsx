import React, { createRef, useState } from 'react';
import Blobs from 'components/Blobs';
import DownArrow from 'components/DownArrow';
import splash from 'img/splash.jpeg';
import terminal from 'img/terminal.gif';
import timeline from 'img/timeline.png';
import bash from 'img/bash.svg';
import python from 'img/python.svg';
import terminal_dark from 'img/terminal_dark.gif';
import graph from 'img/graph.gif';
import ScrollingTimeline from 'components/ScrollingTimeline';
import KeyBoardShortcut from 'components/KeyBoardShortcut';

import FileIcon from 'components/FileIcon';

const homeStyle = {
	overflowX: 'hidden'
};

const gridSubContainer = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center'
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
					<Blobs blob={1} />
				</div>
				<div className="home footer center">
					<DownArrow type={'down'} onClick={handleClicks[1]} />
				</div>
			</div>
			<div className="home section" ref={secondRef}>
				<h1 className="home header center">Why</h1>
				<div className="content-background-container">
					<div className="home content center why-text">
						<h2>A pomodoro app without the bells and the whistles.</h2>
						<p>No loud noises. No complex setup.</p>
						<p>Open with a keystroke. Focus on your work.</p>
						<ScrollingTimeline />
					</div>
					<Blobs blob={2} />
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
							<KeyBoardShortcut />
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
					<Blobs blob={3} />
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
					<Blobs blob={4} />
				</div>
			</div>
			<div className="login-signup-btn-container">
				<a className="login-signup-btn" href="/signup">
					Sign Up
				</a>
				<a className="login-signup-btn" href="/login">
					Log In
				</a>
			</div>
		</div>
	);
};

export default Home;
