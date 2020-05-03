import React from 'react';
import BounceButton from 'components/BounceButton';
import { getAutoHourWidth } from 'utility/calculateSizing';
import { timelineZoomLabelStyle } from 'styles/timelineZoomSelect';

function TimelineZoomSelect(props) {
	const commonMargin = { margin: '0 1rem' };

	return (
		<div style={{ ...props.style }}>
			<span style={{ ...timelineZoomLabelStyle, ...commonMargin }}>Timeline Zoom:</span>
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
				style={{ width: 'auto', ...commonMargin }}
			/>
			<BounceButton
				style={{ width: '7rem', height: '2rem', ...commonMargin }}
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
