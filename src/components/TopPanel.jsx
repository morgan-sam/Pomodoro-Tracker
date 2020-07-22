import React from 'react';
import TopPageText from 'components/TopPageText';
import TimelineDateSelect from 'components/TimelineDateSelect';
import TimeOptionSelect from 'components/TimeOptionSelect';
import TimelineOptions from 'components/TimelineOptions';
import GraphToggle from 'components/GraphToggle';
import DarkThemeToggle from 'components/DarkThemeToggle';
import DayTimeline from 'components/DayTimeline';

function TopPanel(props) {
	return (
		<div style={props.style}>
			<div className={'top-panel-option'}>
				<TopPageText
					entriesData={props.filteredEntries}
					filterOptions={props.filterOptions}
					todaysCommits={props.todaysCommits}
				/>
				<TimelineDateSelect filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
				<TimeOptionSelect timeOptions={props.timeOptions} setTimeOptions={props.setTimeOptions} />
				<TimelineOptions
					timeOptions={props.timeOptions}
					setTimeOptions={props.setTimeOptions}
					displayOptions={props.displayOptions}
					setDisplayOptions={props.setDisplayOptions}
				/>
				<GraphToggle displayOptions={props.displayOptions} setDisplayOptions={props.setDisplayOptions} />
				<DarkThemeToggle displayOptions={props.displayOptions} setDisplayOptions={props.setDisplayOptions} />
			</div>
			<DayTimeline
				entries={props.filteredEntries}
				eventLengths={props.eventLengths}
				displayOptions={props.displayOptions}
				timeOptions={props.timeOptions}
			/>
		</div>
	);
}
export default TopPanel;
