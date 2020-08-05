import React from 'react';
import TopPageText from 'components/TopPageText';
import DateNavigation from 'components/DateNavigation';
import DayTimeline from 'components/Timeline';

function TopPanel(props) {
	return (
		<div style={props.style}>
			<div className={'top-panel-option'}>
				<TopPageText entriesData={props.filteredEntries} date={props.date} />
				<DateNavigation date={props.date} setDate={props.setDate} />
			</div>
			<DayTimeline
				hourWidth={props.hourWidth}
				entries={props.filteredEntries}
				eventLengths={props.eventLengths}
				options={props.options}
			/>
		</div>
	);
}
export default TopPanel;
