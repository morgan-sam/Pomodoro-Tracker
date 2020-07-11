export const getAccountButtonStyle = (darkTheme) => {
	return {
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		border: darkTheme ? 'none' : '1px solid #ccc',
		boxShadow: '2px 2px #ccc'
	};
};
