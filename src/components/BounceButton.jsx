import React, { useEffect, useState } from 'react';

function BounceButton(props) {
	const [ pressed, setPressed ] = useState(false);

	const standardButtonStyle = {
		position: 'relative',
		backgroundImage: 'linear-gradient(#fff, #eee)',
		borderRadius: '1rem',
		cursor: 'pointer',
		outline: '0',
		border: '1px solid black',
		boxShadow: '0 2px 1px #ccc, 0 0.5rem #ccc'
	};

	const animationStyle = {
		animation: `infinite-spinning ${props.delay / 1000}s 1`
	};

	const pressButtonStateStyle = pressed ? animationStyle : null;

	return (
		<button
			{...props}
			style={{ ...standardButtonStyle, ...props.style, ...pressButtonStateStyle }}
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
