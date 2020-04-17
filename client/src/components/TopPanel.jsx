import React from 'react';
import DayTimeline from './DayTimeline';
import TopPageText from 'components/TopPageText';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import TimelineDateSelect from './TimelineDateSelect';

function TopPanel(props) {
	const topOptionStyle = {
		display: 'grid',
		gridTemplateColumns: ' repeat(3, 1fr)',
		gridTemplateRows: '1fr',
		gridColumnGap: '0px',
		gridRowGap: '0px',
		zIndex: '5'
	};
	return (
		<div style={props.style}>
			<div style={topOptionStyle}>
				<TopPageText entriesData={props.filteredEntries} filterOptions={props.filterOptions} />
				<TimelineDateSelect
					filterOptions={props.filterOptions}
					setFilterOptions={props.setFilterOptions}
					style={{ padding: '0' }}
				/>
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
			</div>
			<DayTimeline
				style={{ zIndex: '-2' }}
				entries={props.filteredEntries}
				eventLengths={props.eventLengths}
				displayOptions={props.displayOptions.timeline}
				timeOptions={props.timeOptions}
			/>
		</div>
	);
}
export default TopPanel;
