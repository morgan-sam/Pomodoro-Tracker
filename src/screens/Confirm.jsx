import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getContentBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';

const Confirm = (props) => {
	const { message, onConfirm } = props;
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(darkTheme);

	return (
		<div className="screen-container" style={getAppContainerStyle(darkTheme)}>
			<div className="content-box" style={getContentBoxStyle(darkTheme)}>
				<h2 className="header">{message}</h2>
				<div className="settings-footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Cancel
					</button>
					<button
						style={accountButtonStyle}
						onClick={() => {
							onConfirm();
						}}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
