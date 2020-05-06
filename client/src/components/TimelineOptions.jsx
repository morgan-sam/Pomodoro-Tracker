import React from 'react';
import TimelineZoomSelect from 'components/TimelineZoomSelect';
import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import { optionsPanelItem } from 'styles/optionsPanel';

function TimelineOptions(props) {
	return (
		<div style={props.style}>
			<TimelineZoomSelect
				timeOptions={props.timeOptions}
				setTimeOptions={props.setTimeOptions}
				style={optionsPanelItem}
			/>
			<TimelineDisplaySelect
				setDisplayOptions={props.setDisplayOptions}
				displayOptions={props.displayOptions}
				style={optionsPanelItem}
			/>
		</div>
	);
}
export default TimelineOptions;
