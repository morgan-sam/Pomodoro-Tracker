import React from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';
import { accountFunctions } from 'controller/accountFunctions';

const AccountSettings = (props) => {
	const { options } = props;
	const { changePassword, changeEmail, resetAccount, deleteAccount } = accountFunctions;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	return (
		<div className="screenContainer" style={getAppContainerStyle(options.darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(options.darkTheme)}>
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
				<div className="footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
