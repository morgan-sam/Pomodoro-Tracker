import React from 'react';
import DayTimeline from './DayTimeline';
import TopPageText from 'components/TopPageText';

function TopPanel(props) {
	return (
		<div>
			<TopPageText entriesData={props.filteredEntries} filterOptions={props.filterOptions} />
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
