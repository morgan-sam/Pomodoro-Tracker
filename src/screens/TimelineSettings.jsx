import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';

const TimelineSettings = () => {
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	return (
		<div className="screenContainer">
			<div className="settingsBox">
				<h2 className="header">Timeline Settings</h2>
				<div className="button-column">
					<div>(timeline settings)</div>
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

export default TimelineSettings;
