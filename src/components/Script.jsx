import React from 'react';
import bash from 'img/bash.svg';
import python from 'img/python.svg';

const screenContainer = {
	position: 'absolute',
	top: '0',
	left: '0',
	height: '100vh',
	width: '100vw',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

const settingsBox = {
	width: 'fit-content',
	height: 'fit-content',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '1rem',
	flexDirection: 'column',
	padding: '2rem'
};

const titleStyle = {
	padding: '1rem'
};

const Script = () => {
	return (
		<div style={screenContainer}>
			<div style={settingsBox}>
				<h2 style={titleStyle}>Download Script</h2>
			</div>
		</div>
	);
};

export default Script;
