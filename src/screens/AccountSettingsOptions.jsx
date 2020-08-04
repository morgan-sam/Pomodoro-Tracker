import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getContentBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';
import { accountFunctionTemplates } from 'controller/accountFunctions';

const AccountSettingsOptions = (props) => {
	const { sequence, setSequence } = props;
	const darkTheme = useContext(ThemeContext);
	const accountButtonStyle = getSystemButtonStyle(darkTheme);
	const { changePassword, changeEmail, resetAccount, deleteAccount } = accountFunctionTemplates;
	const history = useHistory();
	return (
		<div className="screen-container" style={getAppContainerStyle(darkTheme)}>
			<div className="content-box" style={getContentBoxStyle(darkTheme)}>
				<h2 className="settings-header">Account Settings</h2>
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
};

export default AccountSettingsOptions;
