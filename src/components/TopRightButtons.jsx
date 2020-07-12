import React from 'react';
import firebase from 'config/firebase';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';

const btnContainerStyle = {
	position: 'absolute',
	top: '1rem',
	right: '1rem'
};

const TopRightButtons = (props) => {
	const history = useHistory();
	const darkTheme = props.displayOptions.darkTheme;
	const topRightButtonStyle = { ...getSystemButtonStyle(darkTheme), marginLeft: '1rem' };
	return (
		<div style={btnContainerStyle}>
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
