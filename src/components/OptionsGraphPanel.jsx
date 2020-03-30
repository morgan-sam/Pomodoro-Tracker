import React from 'react';

import VisibilityOptionSelect from 'components/VisibilityOptionSelect';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import DateNavigation from 'components/DateNavigation';
import GraphDisplay from 'components/GraphDisplay';

import { optionPanelStyle } from 'styles/visibilityOptionSelect';

function OptionsGraphPanel(props) {
	const containerStyle = {
		display: 'inline-flex',
		height: 'auto'
	};

	return (
		<div style={containerStyle}>
			<div style={optionPanelStyle}>
				<DateNavigation filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
				<VisibilityOptionSelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
				/>
			</div>
			<div style={optionPanelStyle}>
				{props.displayOptions.graph.period !== 'none' ? (
					<GraphDisplay
						entriesData={props.entriesData}
						filterOptions={props.filterOptions}
						graphType={props.displayOptions.graph.period}
					/>
				) : null}
			</div>
		</div>
	);
}

export default OptionsGraphPanel;
