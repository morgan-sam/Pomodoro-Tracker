import React from 'react';

const ColorSelect = () => {
	return (
		<div className="color-select">
			<div>Color Theme:</div>
			<div className="color-test-box">{Array.from(Array(4).keys()).map((i) => <div key={i} />)}</div>
			<div className="hsl-slider-container">
				<div>Hue:</div>
				<div>Saturation:</div>
				<div>Lightness:</div>
			</div>
		</div>
	);
};

export default ColorSelect;
