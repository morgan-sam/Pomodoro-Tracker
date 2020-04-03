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
			<BounceButton
				onClick={() => {
					const hourRange = props.timeOptions.endTime - props.timeOptions.startTime;
					props.setTimeOptions({
						...props.timeOptions,
						hourWidth: getPageWidth() / hourRange - 0.5
					});
				}}
				delay={350}
				text={'Reset Zoom'}
			/>
		</div>
	);
}

function getPageWidth() {
	return window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
}

export default TimelineZoomSelect;
