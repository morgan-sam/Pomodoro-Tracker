export const DROPDOWN_HEIGHT_REMS = 2;

export const dropdownParentStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	position: 'relative'
};

export const dropdownElementStyle = {
	width: 'inherit',
	position: 'absolute',
	top: '50%',
	transform: `translateY(-${DROPDOWN_HEIGHT_REMS / 2}rem)`,
	borderRadius: '1rem',
	overflow: 'hidden',
	border: '1px solid black'
};

export const dropdownHeaderStyle = {
	borderTop: 'none',
	width: 'inherit'
};

export const dropdownClosedStyle = {
	cursor: 'pointer',
	maxHeight: `${DROPDOWN_HEIGHT_REMS}rem`,
	overflow: 'hidden',
	width: 'inherit'
};

export const dropdownOpenStyle = {
	cursor: 'pointer',
	maxHeight: 'calc(20rem - 1px)',
	overflowY: 'scroll',
	width: 'inherit'
};

export const dropdownBoxStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	boxSizing: 'border-box',
	height: `${DROPDOWN_HEIGHT_REMS}rem`,
	backgroundColor: '#ccc',
	zIndex: '0',
	textAlign: 'center',
	userSelect: 'none',
	width: 'inherit'
};

export const optionStyle = {
	borderBottom: '1px solid black',
	width: 'inherit'
};

export const selectedOptionStyle = {
	backgroundColor: '#eee'
};

export const finalOptionStyle = {
	borderBottom: 'none',
	width: 'inherit'
};

export const dropdownEndNode = {
	borderTop: '1px solid black',
	zIndex: '1'
};
