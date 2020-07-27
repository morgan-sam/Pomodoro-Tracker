import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';
import { accountFunctions } from 'controller/accountFunctions';

const AccountSettings = (props) => {
	const { changePassword, changeEmail, resetAccount, deleteAccount } = accountFunctions;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	return (
		<div className="screenContainer">
			<div className="settingsBox">
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