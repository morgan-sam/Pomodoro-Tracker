import React from 'react';

import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import GraphDisplaySelect from 'components/GraphDisplaySelect';

import TimelineZoomSelect from './TimelineZoomSelect';

function OptionsPanel(props) {
	return (
		<div style={props.style}>
			<TimelineZoomSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
			<TimelineDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
			<GraphDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
		</div>
	);
}

export default OptionsPanel;
