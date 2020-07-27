import React from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';

const Settings = (props) => {
	const { options } = props;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);
	return (
		<div className="screenContainer" style={getAppContainerStyle(options.darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(options.darkTheme)}>
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
