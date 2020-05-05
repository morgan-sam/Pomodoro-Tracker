import React, { useState, useEffect } from 'react';

function Checkbox(props) {
	const { style, onChange } = props;
	const [ checked, setChecked ] = useState(true);

	const checkboxContainerStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	const checkboxIconStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '1rem',
		height: '1rem',
		border: '2px solid #777',
		pointer: 'cursor',
		select: 'none',
		zIndex: '1',
		borderRadius: style ? style.borderRadius : null,
		boxShadow: '0 0 1px 1px #ddd'
	};

	const checkStyle = {
		height: '100%',
		width: '100%',
		transform: 'scale(0.65)',
		backgroundColor: '#444',
		borderRadius: style ? style.borderRadius : null,
		boxShadow: '0 0 1px 1px #ddd'
	};

	useEffect(
		() => {
			props.onChange(checked);
		},
		[ checked ]
	);

	return (
		<div style={{ ...checkboxContainerStyle, ...style }}>
			<div style={{ ...checkboxIconStyle }} onClick={() => setChecked(!checked)}>
				{checked ? <div style={checkStyle} /> : null}
			</div>
		</div>
	);
}

export default Checkbox;
