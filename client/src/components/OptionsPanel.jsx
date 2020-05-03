import React from 'react';

import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import GraphDisplaySelect from 'components/GraphDisplaySelect';
import TimelineZoomSelect from 'components/TimelineZoomSelect';

function OptionsPanel(props) {
	const optionsContainerStyle = {
		margin: 'auto 4rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	};

	return (
		<div style={props.style}>
			<div className="optionsContainer" style={optionsContainerStyle}>
				<TimelineZoomSelect
					timeOptions={props.timeOptions}
					setTimeOptions={props.setTimeOptions}
					style={{ height: '100%' }}
				/>
				<TimelineDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
					style={{ height: '100%' }}
				/>
				<GraphDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
					style={{ height: '100%' }}
				/>
			</div>
		</div>
	);
}

export default OptionsPanel;
