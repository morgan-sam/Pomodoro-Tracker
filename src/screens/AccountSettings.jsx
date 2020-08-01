import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';
import { accountFunctions } from 'controller/accountFunctions';
import ThemeContext from 'context/theme';

const AccountSettings = () => {
	const darkTheme = useContext(ThemeContext);
	const { changePassword, changeEmail, resetAccount, deleteAccount } = accountFunctions;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(darkTheme);

	return (
		<div className="screenContainer" style={getAppContainerStyle(darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(darkTheme)}>
				<h2 className="header">Account Settings</h2>
				<div className="accountButtonGrid">
					<button style={accountButtonStyle} onClick={changePassword}>
						Change Password
					</button>
					<button style={accountButtonStyle} onClick={changeEmail}>
						Change Email
					</button>
					<button style={accountButtonStyle} onClick={resetAccount}>
						Reset Account
					</button>
					<button style={accountButtonStyle} onClick={deleteAccount}>
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
};

export default AccountSettings;
