export const getSystemButtonStyle = (darkTheme) => {
	return {
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		border: darkTheme ? 'none' : '1px solid #ccc',
		boxShadow: '2px 2px #ccc',
		cursor: 'pointer'
	};
};

export const getSettingsBoxStyle = (darkTheme) => {
	return {
		border: darkTheme ? '1px solid #fff' : '1px solid #000',
		backgroundColor: darkTheme ? '#333842' : '#fff'
	};
};
