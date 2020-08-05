import React from 'react';

const ColorSelect = (props) => {
	const { tempOptions, setTempOptions } = props;
	return (
		<div className="color-select">
			<div className="color-theme-title">Color Theme:</div>
			<div className="color-test-box">{Array.from(Array(4).keys()).map((i) => <div key={i} />)}</div>
			<div className="hsl-slider-container">
				<span>Hue:</span>
				<input
					type="range"
					min="1"
					max="20"
					// value={tempOptions.colorTheme.hue}
					step="1"
				/>
				<span>Saturation:</span>
				<input
					type="range"
					min="1"
					max="20"
					// value={tempOptions.colorTheme.saturation}
					step="1"
				/>
				<span>Lightness:</span>
				<input
					type="range"
					min="1"
					max="20"
					// value={tempOptions.colorTheme.lightness}
					step="1"
				/>
			</div>
		</div>
	);
};

export default ColorSelect;
