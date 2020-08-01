import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';
import { accountFunctionTemplates } from 'controller/accountFunctions';
import Confirm from 'screens/Confirm';
import PasswordInput from 'screens/PasswordInput';
import Input from 'screens/Input';
import Alert from 'screens/Alert';

const AccountSettings = () => {
	const [ currentDisplay, setCurrentDisplay ] = useState('default');
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(darkTheme);
	const { changePassword, changeEmail, resetAccount, deleteAccount } = accountFunctionTemplates;

	const [ sequence, setSequence ] = useState({
		fnObj: null,
		confirmed: null,
		authorised: null,
		input: null
	});

	const resetSequence = (message) => {
		setSequence({
			fnObj: null,
			confirmed: null,
			authorised: null,
			input: null
		});
		if (message) setCurrentDisplay(message);
		else return setCurrentDisplay('default');
	};

	const accountFunction = async (obj) => {
		const { confirmMsg, passwordMsg, inputMsg, action } = obj;
		const { fnObj, confirmed, authorised, input } = sequence;
		if (confirmMsg && confirmed === null) return setCurrentDisplay('confirm');
		if (confirmed === false) return resetSequence();
		if (passwordMsg && authorised === null) return setCurrentDisplay('password');
		if (authorised === false) return resetSequence('Incorrect Password');
		if (inputMsg && input === null) return setCurrentDisplay('input');
		action(input);
		return history.push('/');
	};

	const accountButtons = (
		<div className="screenContainer" style={getAppContainerStyle(darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(darkTheme)}>
				<h2 className="header">Account Settings</h2>
				<div className="accountButtonGrid">
					<button
						style={accountButtonStyle}
						onClick={() => setSequence({ ...sequence, fnObj: changePassword })}
					>
						Change Password
					</button>
					<button style={accountButtonStyle} onClick={() => setSequence({ ...sequence, fnObj: changeEmail })}>
						Change Email
					</button>
					<button
						style={accountButtonStyle}
						onClick={() => setSequence({ ...sequence, fnObj: resetAccount })}
					>
						Reset Account
					</button>
					<button
						style={accountButtonStyle}
						onClick={() => setSequence({ ...sequence, fnObj: deleteAccount })}
					>
						Delete Account
					</button>
				</div>
				<div className="settings-footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);

	useEffect(
		() => {
			const runThroughSequence = async () => {
				const { fnObj } = sequence;
				if (fnObj) return accountFunction(fnObj);
			};
			runThroughSequence();
		},
		[ sequence ]
	);

	if (currentDisplay === 'default') return accountButtons;
	else if (currentDisplay === 'confirm')
		return (
			<Confirm
				message={sequence.fnObj.confirmMsg}
				onConfirm={(val) => setSequence({ ...sequence, confirmed: val })}
			/>
		);
	else if (currentDisplay === 'password')
		return (
			<PasswordInput
				message={sequence.fnObj.passwordMsg}
				onConfirm={(val) => setSequence({ ...sequence, authorised: val })}
			/>
		);
	else if (currentDisplay === 'input')
		return <Input message={sequence.fnObj.inputMsg} onSubmit={(val) => setSequence({ ...sequence, input: val })} />;
	else return <Alert message={currentDisplay} />;
};

export default AccountSettings;
