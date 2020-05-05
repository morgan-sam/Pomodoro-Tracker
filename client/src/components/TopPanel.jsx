import React from 'react';
import TopPageText from 'components/TopPageText';
import TimelineDateSelect from 'components/TimelineDateSelect';
import TimeOptionSelect from 'components/TimeOptionSelect';
import GraphToggle from 'components/GraphToggle';
import DayTimeline from 'components/DayTimeline';
import { topOptionStyle } from 'styles/topPanel';

function TopPanel(props) {
	return (
		<div style={props.style}>
			<div style={topOptionStyle}>
				<TopPageText entriesData={props.filteredEntries} filterOptions={props.filterOptions} />
				<TimelineDateSelect filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
				<GraphToggle displayOptions={props.displayOptions} setDisplayOptions={props.setDisplayOptions} />
			</div>
			<DayTimeline
				entries={props.filteredEntries}
				eventLengths={props.eventLengths}
				displayOptions={props.displayOptions.timeline}
				timeOptions={props.timeOptions}
			/>
		</div>
	);
}
export default TopPanel;
