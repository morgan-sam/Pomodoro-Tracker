import React from 'react';
import TimelineZoomSelect from 'components/TimelineZoomSelect';
import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import { optionsPanelItem } from 'styles/optionsPanel';

function TimelineOptions(props) {
	return (
		<div style={{ ...props.style, width: '20rem', margin: '0 4rem 0 3rem' }}>
			<TimelineDisplaySelect
				setDisplayOptions={props.setDisplayOptions}
				displayOptions={props.displayOptions}
				style={optionsPanelItem}
			/>
			<TimelineZoomSelect
				timeOptions={props.timeOptions}
				setTimeOptions={props.setTimeOptions}
				style={optionsPanelItem}
			/>
		</div>
	);
}
export default TimelineOptions;
