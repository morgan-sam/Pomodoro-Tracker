import React, { useContext } from 'react';
import firebase from 'config/firebase';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/settings';
import { DarkThemeContext } from 'context/theme';

const TopRightButtons = () => {
	const history = useHistory();
	const darkTheme = useContext(DarkThemeContext);
	const topRightButtonStyle = { ...getSystemButtonStyle(darkTheme) };
	return (
		<div className={'top-right-btns-container'}>
			<button
				style={topRightButtonStyle}
				onClick={() => (window.location = 'https://github.com/morgan-sam/Pomodoro-Tracker#Getting-Started')}
			>
				Help
			</button>
			<button style={topRightButtonStyle} onClick={() => history.push('/script')}>
				Get Script
			</button>
			<button style={topRightButtonStyle} onClick={() => history.push('/settings')}>
				Settings
			</button>
			<button style={topRightButtonStyle} onClick={() => firebase.auth().signOut()}>
				Log Out
			</button>
		</div>
	);
};

export default TopRightButtons;
