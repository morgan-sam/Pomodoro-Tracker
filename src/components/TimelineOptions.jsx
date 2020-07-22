import React from 'react';
import TimelineZoomSelect from 'components/TimelineZoomSelect';
import TimelineDisplaySelect from 'components/TimelineDisplaySelect';

function TimelineOptions(props) {
	return (
		<div className={'options-panel'} style={{ ...props.style, width: '20rem', margin: '0 4rem 0 3rem' }}>
			<TimelineDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
			<TimelineZoomSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
		</div>
	);
}
export default TimelineOptions;
