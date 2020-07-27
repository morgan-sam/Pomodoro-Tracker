import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';

const Settings = (props) => {
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);
	return (
		<div className="screenContainer">
			<div className="settingsBox">
				<h2 className="header">Settings</h2>
				<div className="button-column">
					<button style={accountButtonStyle} onClick={() => history.push('/settings/timeline')}>
						Timeline Settings
					</button>
					<button style={accountButtonStyle} onClick={() => history.push('/settings/account')}>
						Account Settings
					</button>
				</div>
				<div className="footer">
					<button style={accountButtonStyle} onClick={() => history.push('/')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default Settings;
