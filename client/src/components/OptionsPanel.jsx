import React from 'react';

import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import GraphDisplaySelect from 'components/GraphDisplaySelect';

import TimelineZoomSelect from './TimelineZoomSelect';
import TimelineDateSelect from './TimelineDateSelect';

function OptionsPanel(props) {
	return (
		<div style={props.style}>
			<TimelineDateSelect
				filterOptions={props.filterOptions}
				setFilterOptions={props.setFilterOptions}
				style={{ padding: '0' }}
			/>
			<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
			<TimelineZoomSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
			<TimelineDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
			<GraphDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
		</div>
	);
}

export default OptionsPanel;
