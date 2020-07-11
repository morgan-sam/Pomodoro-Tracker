import React from 'react';
import { getAccountButtonStyle } from 'styles/accountSettings';

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

const buttonGrid = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, 1fr)',
	gridGap: '1rem',
	padding: '2rem'
};

const titleStyle = {
	padding: '1rem'
};

const returnButtonContainer = {
	padding: '1rem'
};

const Settings = () => {
	const accountButtonStyle = getAccountButtonStyle(false);
	return (
		<div style={screenContainer}>
			<div style={settingsBox}>
				<h2 style={titleStyle}>Account Settings</h2>
				<div style={buttonGrid}>
					<button style={accountButtonStyle}>Change Password</button>
					<button style={accountButtonStyle}>Change Email</button>
					<button style={accountButtonStyle}>Reset Account</button>
					<button style={accountButtonStyle}>Delete Account</button>
				</div>
				<div style={returnButtonContainer}>
					<button style={accountButtonStyle}>Return</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
