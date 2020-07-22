import React from 'react';
import BounceButton from 'components/BounceButton';

function TimelineDisplaySelect(props) {
	return (
		<div style={{ ...props.style }}>
			<BounceButton
				onClick={() =>
					props.setOptions({
						...props.options,
						timeline: {
							...props.options.timeline,
							start: !props.options.timeline.start
						}
					})}
				delay={300}
				className={'timeline-display-select-toggle-button timeline-display-select-common-margin'}
				text={`Turn ${props.options.timeline.start ? 'Off' : 'On'} Start Markers`}
			/>
			<BounceButton
				onClick={() =>
					props.setOptions({
						...props.options,
						timeline: {
							...props.options.timeline,
							encore: !props.options.timeline.encore
						}
					})}
				delay={300}
				className={'timeline-display-select-toggle-button timeline-display-select-common-margin'}
				text={`Turn ${props.options.timeline.encore ? 'Off' : 'On'} Encores`}
			/>

			<BounceButton
				onClick={() =>
					props.setOptions({
						...props.options,
						timeline: {
							...props.options.timeline,
							grid: !props.options.timeline.grid
						}
					})}
				delay={300}
				className={'timeline-display-select-toggle-button timeline-display-select-common-margin'}
				text={`Turn ${props.options.timeline.grid ? 'Off' : 'On'} Grid`}
			/>
		</div>
	);
}

export default TimelineDisplaySelect;
