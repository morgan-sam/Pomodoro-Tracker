import React from 'react';
import firebase from 'config/firebase';
import { useHistory } from 'react-router-dom';

const accountButtonsStyle = {
	position: 'absolute',
	top: '1rem',
	right: '1rem'
};

const getLogOutButtonStyle = (darkTheme) => {
	return {
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		border: darkTheme ? 'none' : '1px solid #ccc',
		boxShadow: '2px 2px #ccc',
		marginLeft: '1rem'
	};
};

const AccountButtons = (props) => {
	const history = useHistory();
	const darkTheme = props.displayOptions.darkTheme;
	return (
		<div style={accountButtonsStyle}>
			<button style={getLogOutButtonStyle(darkTheme)} onClick={() => history.push('/settings')}>
				Settings
			</button>
			<button style={getLogOutButtonStyle(darkTheme)} onClick={() => firebase.auth().signOut()}>
				Log Out
			</button>
		</div>
	);
};

export default AccountButtons;
