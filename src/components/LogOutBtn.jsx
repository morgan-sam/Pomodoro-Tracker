import React from 'react';
import firebase from 'config/firebase';

const getLogOutButtonStyle = (darkTheme) => {
	return {
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		border: darkTheme ? 'none' : '1px solid #ccc',
		boxShadow: '2px 2px #ccc'
	};
};

const LogOutBtn = (props) => {
	const darkTheme = props.displayOptions.darkTheme;
	return (
		<button style={getLogOutButtonStyle(darkTheme)} onClick={() => firebase.auth().signOut()}>
			Log Out
		</button>
	);
};

export default LogOutBtn;
