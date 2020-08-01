import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';
import { accountFunctionTemplates } from 'controller/accountFunctions';
import { reauthenticate } from 'data/queries';
import Confirm from 'screens/Confirm';
import Input from 'screens/Input';

const AccountSettings = () => {
	const [ currentDisplay, setCurrentDisplay ] = useState(null);
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

	const userCheckPassword = async (passwordMsg) => {
		const password = prompt(passwordMsg);
		if (password) return await reauthenticate(password);
		else return false;
	};

	const resetSequence = () =>
		setSequence({
			fnObj: null,
			confirmed: null,
			authorised: null,
			input: null
		});

	const accountFunction = async (obj) => {
		const { confirmMsg, passwordMsg, inputMsg, action } = obj;
		const { fnObj, confirmed, authorised, input } = sequence;
		if (confirmMsg && confirmed === null)
			return setCurrentDisplay(
				<Confirm
					message={confirmMsg}
					onConfirm={(val) => setSequence({ ...sequence, confirmed: val })}
					returnToMenu={() => setCurrentDisplay(accountButtons)}
				/>
			);
		if (confirmed === false) return resetSequence();
		console.log('hello');
		// const auth = passwordMsg ? await userCheckPassword(passwordMsg) : true;
		// if (!auth) return alert('Incorrect Password');
		// const input = inputMsg ? window.prompt(inputMsg) : false;
		// return input ? action(input) : action();
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

	useEffect(() => setCurrentDisplay(accountButtons), []);

	return currentDisplay;
};

export default AccountSettings;
