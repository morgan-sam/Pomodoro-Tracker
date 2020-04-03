import React from 'react';
import { containerStyle, timeOptionLabelStyle } from 'styles/timeOptionSelect';

function TimelineZoomSelect(props) {
	return (
		<div style={containerStyle}>
			<span style={timeOptionLabelStyle}>Timeline Zoom:</span>
			<input
				type="range"
				min="2"
				max="20"
				value={props.timeOptions.hourWidth}
				onChange={(e) => {
					props.setTimeOptions({
						...props.timeOptions,
						hourWidth: e.target.value
					});
				}}
				step="0.01"
				style={{ width: '15rem' }}
			/>
		</div>
	);
}

export default TimelineZoomSelect;
