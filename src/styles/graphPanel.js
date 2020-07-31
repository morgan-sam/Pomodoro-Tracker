export const getGraphStyle = (darkTheme) => {
	return {
		display: 'flex',
		border: `1px solid ${darkTheme ? 'white' : 'black'}`,
		transition: 'border 1.5s',
		boxSizing: 'border-box',
		alignItems: 'center',
		justifyContent: 'center'
	};
};
