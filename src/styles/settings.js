export const getSystemButtonStyle = (darkTheme) => {
	return {
		backgroundColor: 'rgb(239, 239, 239)',
		textAlign: 'center',
		color: 'black',
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		border: darkTheme ? '0px solid #ccc' : '1px solid #ccc',
		transition: 'border 1.5s',
		boxShadow: '2px 2px #ccc',
		cursor: 'pointer',
		userSelect: 'none'
	};
};

export const getSettingsBoxStyle = (darkTheme) => {
	return {
		border: darkTheme ? '1px solid #fff' : '1px solid #000',
		backgroundColor: darkTheme ? '#333842' : '#fff'
	};
};
