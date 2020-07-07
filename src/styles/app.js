export const getAppContainerStyle = (darkTheme) => {
	return {
		position: 'absolute',
		top: '0',
		left: '0',
		height: '100vh',
		width: '100vw',
		backgroundColor: darkTheme ? '#282c34' : 'white',
		color: darkTheme ? 'white' : 'black'
	};
};

export const panelContainerStyle = {
	height: '100%',
	width: '100%',
	boxSizing: 'border-box',
	padding: '2.8rem 4rem 4rem 4rem'
};
