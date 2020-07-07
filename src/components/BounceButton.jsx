import React, { useState } from 'react';
import { getBounceButtonStyle } from 'styles/bounceButton';

function BounceButton(props) {
	const [ pressed, setPressed ] = useState(false);

	return (
		<button
			{...props}
			style={{ ...getBounceButtonStyle(pressed, props.delay), ...props.style }}
			onClick={() => {
				setPressed(true);
				setTimeout(() => {
					setPressed(false);
					props.onClick();
				}, props.delay);
			}}
		>
			{props.text}
		</button>
	);
}

export default BounceButton;
