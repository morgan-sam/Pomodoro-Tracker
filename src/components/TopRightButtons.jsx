import React, { useContext } from 'react';
import firebase from 'config/firebase';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/settings';
import ThemeContext from 'context/theme';

const TopRightButtons = () => {
	const history = useHistory();
	const darkTheme = useContext(ThemeContext);
	const topRightButtonStyle = { ...getSystemButtonStyle(darkTheme), marginLeft: '1rem' };
	return (
		<div className={'top-right-btns-container'}>
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
