import React from 'react';
import firebase from 'config/firebase';
import { useHistory } from 'react-router-dom';
import { getAccountButtonStyle } from 'styles/accountSettings';

const accountButtonsStyle = {
	position: 'absolute',
	top: '1rem',
	right: '1rem'
};

const AccountButtons = (props) => {
	const history = useHistory();
	const darkTheme = props.displayOptions.darkTheme;
	const accountButtonStyle = getAccountButtonStyle(darkTheme);
	return (
		<div style={accountButtonsStyle}>
			<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
				Settings
			</button>
			<button style={{ ...accountButtonStyle, marginLeft: '1rem' }} onClick={() => firebase.auth().signOut()}>
				Log Out
			</button>
		</div>
	);
};

export default AccountButtons;
