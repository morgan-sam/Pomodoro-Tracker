import React from 'react';
import DayTimeline from './DayTimeline';
import TopPageText from 'components/TopPageText';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import TimelineDateSelect from './TimelineDateSelect';

function TopPanel(props) {
	const topOptionStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		zIndex: '5',
		padding: '2rem 0'
	};

	return (
		<div style={props.style}>
			<div style={topOptionStyle}>
				<TopPageText entriesData={props.filteredEntries} filterOptions={props.filterOptions} />
				<TimelineDateSelect filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
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
