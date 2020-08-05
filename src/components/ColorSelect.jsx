import React from 'react';

const ColorSelect = (props) => {
	const { tempOptions, setTempOptions } = props;
	console.log(tempOptions);
	return (
		<div className="color-select">
			<div className="color-theme-title">Color Theme:</div>
			<div className="color-test-box">{Array.from(Array(4).keys()).map((i) => <div key={i} />)}</div>
			<div className="hsl-slider-container">
				<span>Hue:</span>
				<input
					type="range"
					min="0"
					max="359"
					value={tempOptions.colorTheme.hue}
					onChange={(el) =>
						setTempOptions({
							...tempOptions,
							colorTheme: {
								...tempOptions.colorTheme,
								hue: parseInt(el.target.value)
							}
						})}
					step="1"
				/>
				<span>Saturation:</span>
				<input
					type="range"
					min="0"
					max="200"
					value={tempOptions.colorTheme.saturation * 100}
					onChange={(el) =>
						setTempOptions({
							...tempOptions,
							colorTheme: {
								...tempOptions.colorTheme,
								saturation: parseInt(el.target.value) / 100
							}
						})}
					step="1"
				/>
				<span>Lightness:</span>
				<input
					type="range"
					min="0"
					max="200"
					value={tempOptions.colorTheme.lightness * 100}
					onChange={(el) =>
						setTempOptions({
							...tempOptions,
							colorTheme: {
								...tempOptions.colorTheme,
								lightness: parseInt(el.target.value) / 100
							}
						})}
					step="1"
				/>
			</div>
		</div>
	);
};

export default ColorSelect;
