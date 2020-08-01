import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getSettingsBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';

const Input = (props) => {
	const { inputMsg } = props;
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(darkTheme);

	return (
		<div className="screenContainer" style={getAppContainerStyle(darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(darkTheme)}>
				<h2 className="header">{inputMsg}</h2>
				<form />
				<div className="settings-footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Cancel
					</button>
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Input;
