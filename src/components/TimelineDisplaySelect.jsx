import React from 'react';
import BounceButton from './BounceButton';
import {
	containerStyle,
	toggleButtonStyle,
	timelineDisplaySelectLabelStyle,
	graphSelectionDropdownStyle
} from 'styles/timelineDisplaySelect';
import Dropdown from 'components/Dropdown';

function TimelineDisplaySelect(props) {
	return (
		<div style={containerStyle}>
			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						timeline: {
							...props.displayOptions.timeline,
							encore: !props.displayOptions.timeline.encore
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.timeline.encore ? 'Off' : 'On'} Encores`}
			/>
			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						timeline: {
							...props.displayOptions.timeline,
							start: !props.displayOptions.timeline.start
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.timeline.start ? 'Off' : 'On'} Start Markers`}
			/>

			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						timeline: {
							...props.displayOptions.timeline,
							grid: !props.displayOptions.timeline.grid
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.timeline.grid ? 'Off' : 'On'} Grid`}
			/>
		</div>
	);
}

export default TimelineDisplaySelect;
