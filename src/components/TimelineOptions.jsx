import React from 'react';
import TimelineZoomSelect from 'components/TimelineZoomSelect';
import TimelineDisplaySelect from 'components/TimelineDisplaySelect';

function TimelineOptions(props) {
	return (
		<div className={'options-panel'} style={{ ...props.style, width: '20rem', margin: '0 4rem 0 3rem' }}>
			<TimelineDisplaySelect setOptions={props.setOptions} options={props.options} />
			<TimelineZoomSelect options={props.options} setOptions={props.setOptions} />
		</div>
	);
}
export default TimelineOptions;
