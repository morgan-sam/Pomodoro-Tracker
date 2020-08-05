import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getContentBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';

const Alert = (props) => {
	const { message } = props;
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(darkTheme);

	return (
		<div className="screen-container" style={getAppContainerStyle(darkTheme)}>
			<div className="content-box" style={getContentBoxStyle(darkTheme)}>
				<h2 className="header">{message}</h2>
				<div className="footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default Alert;
