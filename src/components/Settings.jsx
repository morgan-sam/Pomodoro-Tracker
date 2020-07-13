import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';
import { reauthenticate, changePassword, changeEmail, deleteAllEntries, deleteAccount } from 'data/queries';

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
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	const userCheckPassword = async (passwordMsg) => {
		const password = prompt(passwordMsg);
		if (password) return await reauthenticate(password);
		else return false;
	};

	const accountFunction = async (obj) => {
		const { confirmMsg, passwordMsg, inputMsg, action } = obj;
		const confirmed = confirmMsg ? window.confirm(confirmMsg) : true;
		if (!confirmed) return null;
		const auth = passwordMsg ? await userCheckPassword(passwordMsg) : true;
		if (!auth) return alert('Incorrect Password');
		const input = inputMsg ? window.prompt(inputMsg) : false;
		return input ? action(input) : action();
	};

	const changePasswordTemplate = {
		confirmMsg: '',
		passwordMsg: 'Please enter your current password:',
		inputMsg: 'Please enter your new password:',
		action: changePassword
	};

	const changeEmailTemplate = {
		confirmMsg: '',
		passwordMsg: 'Please enter your password:',
		inputMsg: 'Please enter the new email you would like to use:',
		action: changeEmail
	};

	const resetAccountTemplate = {
		confirmMsg: 'Are you sure you want to reset your account? This will delete all pomodoro entries.',
		passwordMsg: 'Please enter your password to reset your account:',
		inputMsg: '',
		action: deleteAllEntries
	};

	const deleteAccountTemplate = {
		confirmMsg: 'Are you sure you want to delete your account? (THIS CANNOT BE UNDONE)',
		passwordMsg: 'Please enter your password to PERMANENTLY DELETE your account:',
		inputMsg: '',
		action: deleteAccount
	};

	return (
		<div style={screenContainer}>
			<div style={settingsBox}>
				<h2 style={titleStyle}>Settings</h2>
				<div style={buttonGrid}>
					<button style={accountButtonStyle} onClick={() => accountFunction(changePasswordTemplate)}>
						Change Password
					</button>
					<button style={accountButtonStyle} onClick={() => accountFunction(changeEmailTemplate)}>
						Change Email
					</button>
					<button style={accountButtonStyle} onClick={() => accountFunction(resetAccountTemplate)}>
						Reset Account
					</button>
					<button style={accountButtonStyle} onClick={() => accountFunction(deleteAccountTemplate)}>
						Delete Account
					</button>
				</div>
				<div style={returnButtonContainer}>
					<button style={accountButtonStyle} onClick={() => history.push('/')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
