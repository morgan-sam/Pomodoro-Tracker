export const getAppContainerStyle = (darkTheme) => {
	return {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		overflow: 'auto',
		backgroundColor: darkTheme ? '#282c34' : 'white',
		color: darkTheme ? 'white' : 'black',
		transition: 'background-color 2s, color 2s'
	};
};
