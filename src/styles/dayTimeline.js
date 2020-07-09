export const EVENT_HEIGHT_REM = 5;

export const containerStyle = {
	height: '9rem',
	overflowX: 'auto',
	margin: '1.2rem 0'
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

export const getBoxStyle = (darkTheme) => {
	return {
		position: 'relative',
		display: 'flex',
		height: `${EVENT_HEIGHT_REM + 3}rem`,
		flexDirection: 'row',
		border: `1px solid ${darkTheme ? 'white' : 'black'}`,
		boxSizing: 'border-box',
		overflowX: 'hidden'
	};
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

export const getDefaultEventBoxStyle = (darkTheme) => {
	return {
		display: 'inline-block',
		height: `${EVENT_HEIGHT_REM}rem`,
		border: `1px solid ${darkTheme ? 'white' : 'black'}`,
		position: 'absolute',
		bottom: '0'
	};
};

export const getEventBoxTypeStyle = (darkTheme) => {
	return {
		start: {
			backgroundColor: '#eee',
			border: '1px dashed #ddd',
			bottom: '1px',
			height: `calc(${EVENT_HEIGHT_REM}rem - 1px)`,
			zIndex: '-1'
		},
		pomodoro: {
			backgroundColor: darkTheme ? '#e59400' : '#c3e5a7'
		},
		encore: {
			backgroundColor: darkTheme ? '#a06700' : '#95c39f'
		}
	};
};

const zzwidth = 3;
const zzcolor = '#FF7744';
export const currentTimeMarkerStyle = {
	width: `calc(${EVENT_HEIGHT_REM + 3}rem - 2px`,
	height: `${zzwidth * 2}px`,
	background: `linear-gradient(-45deg, ${zzcolor} ${zzwidth}px, transparent 0), linear-gradient(45deg, ${zzcolor} ${zzwidth}px, transparent 0)`,
	backgroundSize: `${zzwidth * 2}px ${zzwidth * 2}px`,
	backgroundPosition: 'left-center',
	transformOrigin: `-1px 0%`,
	position: 'absolute',
	top: '0',
	right: '0',
	transform: `rotate(90deg) translateY(-${zzwidth * 2}px)`
};