import React, { useState, useEffect } from 'react';

function Checkbox(props) {
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
		border: '1px solid black',
		pointer: 'cursor',
		select: 'none',
		zIndex: '1',
		borderRadius: props.style.borderRadius
	};

	const checkStyle = {
		height: '65%',
		width: '65%',
		backgroundColor: 'black',
		borderRadius: props.style.borderRadius
	};

	useEffect(
		() => {
			props.onChange(checked);
		},
		[ checked ]
	);

	return (
		<div style={{ ...checkboxContainerStyle, ...props.style }}>
			<div style={{ ...checkboxIconStyle }} onClick={() => setChecked(!checked)}>
				{checked ? <div style={checkStyle} /> : null}
			</div>
		</div>
	);
}

export default Checkbox;
