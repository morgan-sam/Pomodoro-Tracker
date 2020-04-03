import React from 'react';
import { containerStyle, timelineZoomLabelStyle } from 'styles/timelineZoomSelect';
import BounceButton from './BounceButton';
import { getAutoHourWidth } from 'utility/calculateSizing';

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
			<BounceButton
				onClick={() => {
					props.setTimeOptions({
						...props.timeOptions,
						hourWidth: getAutoHourWidth(props.timeOptions)
					});
				}}
				delay={350}
				text={'Reset Zoom'}
			/>
		</div>
	);
}

export default TimelineZoomSelect;
