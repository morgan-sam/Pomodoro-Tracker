export const getGraphStyle = (darkTheme) => {
	return {
		display: 'flex',
		border: `1px solid ${darkTheme ? 'white' : 'black'}`,
		boxSizing: 'border-box',
		alignItems: 'center',
		justifyContent: 'center'
	};
};
