import React from 'react';
import { containerStyle, timelineZoomLabelStyle } from 'styles/timelineZoomSelect';
import BounceButton from './BounceButton';

function TimelineZoomSelect(props) {
	return (
		<div style={containerStyle}>
			<span style={timelineZoomLabelStyle}>Timeline Zoom:</span>
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
				style={{ width: 'auto' }}
			/>
			<BounceButton />
		</div>
	);
}

export default TimelineZoomSelect;
