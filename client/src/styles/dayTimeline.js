export const EVENT_HEIGHT_REM = 5;

export const containerStyle = {
	height: '9rem',
	overflowX: 'auto'
};

export const scrollbarStyle = {
	display: 'flex',
	whiteSpace: 'nowrap',
	width: 'auto',
	maxWidth: '100%',
	overflowX: 'auto',
	position: 'relative',
	flexDirection: 'row'
};

export const boxStyle = {
	position: 'relative',
	display: 'flex',
	height: `${EVENT_HEIGHT_REM + 3}rem`,
	flexDirection: 'row',
	border: '1px solid black',
	boxSizing: 'border-box',
	overflowX: 'hidden'
};

export const textStyle = {
	position: 'absolute',
	textAlign: 'center',
	verticalAlign: 'middle',
	padding: '0 5px'
};

export const innerGridStyle = {
	position: 'absolute',
	bottom: '0',
	width: '25%',
	height: `calc(${EVENT_HEIGHT_REM}rem + 1px)`,
	border: '1px solid #555',
	borderBottom: 'none',
	borderRight: 'none',
	flexDirection: 'row',
	boxSizing: 'border-box',
	zIndex: '1'
};

export const defaultEventBoxStyle = {
	display: 'inline-block',
	height: `${EVENT_HEIGHT_REM}rem`,
	border: '1px solid black',
	position: 'absolute',
	bottom: '0'
};

export const eventBoxTypeStyle = {
	start: {
		backgroundColor: '#eee',
		border: '1px dashed #ddd',
		bottom: '1px',
		height: `calc(${EVENT_HEIGHT_REM}rem - 1px)`,
		zIndex: '-1'
	},
	pomodoro: {
		backgroundColor: '#c3e5a7'
	},
	encore: {
		backgroundColor: '#95c39f'
	}
};