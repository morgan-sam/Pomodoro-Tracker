import React from 'react';
import TopPageText from 'components/TopPageText';
import TimelineDateSelect from 'components/TimelineDateSelect';
import TimeOptionSelect from 'components/TimeOptionSelect';
import Checkbox from 'components/Checkbox';
import DayTimeline from 'components/DayTimeline';
import { topOptionStyle } from 'styles/topPanel';

function TopPanel(props) {
	return (
		<div style={props.style}>
			<div style={topOptionStyle}>
				<TopPageText entriesData={props.filteredEntries} filterOptions={props.filterOptions} />
				<TimelineDateSelect filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
				<Checkbox style={{ borderRadius: '100%' }} onChange={() => null} />
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
