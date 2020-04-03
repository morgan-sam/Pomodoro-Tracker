import React from 'react';

import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import DateNavigation from 'components/DateNavigation';
import GraphPanel from 'components/GraphPanel';
import GraphDisplaySelect from 'components/GraphDisplaySelect';

import { optionPanelStyle } from 'styles/timelineDisplaySelect';
import TimelineZoomSelect from './TimelineZoomSelect';

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
				<TimelineZoomSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
				<TimelineDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
				/>
				<GraphDisplaySelect setDisplayOptions={props.setDisplayOptions} displayOptions={props.displayOptions} />
			</div>
			<div
				style={{
					...optionPanelStyle,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				{props.displayOptions.graph.period !== 'none' ? (
					<GraphPanel
						entriesData={props.entriesData}
						filterOptions={props.filterOptions}
						{...props.displayOptions.graph}
					/>
				) : null}
			</div>
		</div>
	);
}

export default OptionsGraphPanel;
