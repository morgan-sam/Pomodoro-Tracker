import React from 'react';
import { timelineZoomLabelStyle, timelineZoomCheckbox } from 'styles/timelineZoomSelect';
import BounceButton from './BounceButton';
import Checkbox from './Checkbox';
import { getAutoHourWidth } from 'utility/calculateSizing';
import { containerStyle } from 'styles/optionsPanel';

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
				style={{ width: '7rem', height: '2rem' }}
				onClick={() => {
					props.setTimeOptions({
						...props.timeOptions,
						hourWidth: getAutoHourWidth(props.timeOptions)
					});
				}}
				delay={350}
				text={'Reset Zoom'}
			/>
			<span style={timelineZoomLabelStyle}>Auto Adjust:</span>
			<Checkbox
				style={timelineZoomCheckbox}
				default={props.timeOptions.autoAdjust}
				onChange={(val) => {
					props.setTimeOptions({
						...props.timeOptions,
						autoAdjust: val
					});
				}}
			/>
		</div>
	);
}

export default TimelineZoomSelect;
