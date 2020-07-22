import React from 'react';
import BounceButton from 'components/BounceButton';
import { getAutoHourWidth } from 'utility/calculateSizing';

function TimelineZoomSelect(props) {
	return (
		<div className={'timeline-zoom'} style={{ ...props.style }}>
			<span className={'timeline-zoom-label-style'}>Timeline Zoom:</span>
			<input
				type="range"
				min="2"
				max="20"
				value={props.options.timeline.hourWidth}
				onChange={(e) => {
					props.setOptions({
						...props.options,
						timeline: {
							...props.options.timeline,
							hourWidth: e.target.value
						}
					});
				}}
				step="0.01"
				style={{ width: 'auto' }}
			/>
			<BounceButton
				style={{ width: '7rem', height: '2rem' }}
				onClick={() => {
					props.setOptions({
						...props.options,
						timeline: {
							...props.options.timeline,
							hourWidth: getAutoHourWidth(props.options.timeline)
						}
					});
				}}
				delay={350}
				text={'Reset Zoom'}
			/>
		</div>
	);
}

export default TimelineZoomSelect;
