import React from 'react';

import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import GraphDisplaySelect from 'components/GraphDisplaySelect';
import TimelineZoomSelect from 'components/TimelineZoomSelect';

import { optionsPanelItem } from 'styles/optionsPanel';

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
					style={optionsPanelItem}
				/>
				<TimelineDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
					style={optionsPanelItem}
				/>
				<GraphDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
					style={optionsPanelItem}
				/>
			</div>
		</div>
	);
}

export default OptionsPanel;
