import React from 'react';

const ColorTestDisplay = (props) => {
	const boxRemUnit = 7;
	const boxDims = { width: `${boxRemUnit}rem`, height: `${boxRemUnit}rem` };
	return (
		<div style={{ display: 'flex', position: 'fixed' }}>
			{Array.from(Array(4).keys()).map((i) => (
				<div style={{ ...boxDims, backgroundColor: `var(--color${i + 1}-mid` }} />
			))}
		</div>
	);
};

export default ColorTestDisplay;
