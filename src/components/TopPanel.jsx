import React from 'react';
import TopPageText from 'components/TopPageText';
import DateNavigation from 'components/DateNavigation';
import TimeOptionSelect from 'components/TimeOptionSelect';
import TimelineDisplaySelect from 'components/TimelineDisplaySelect';
import GraphToggle from 'components/GraphToggle';
import DarkThemeToggle from 'components/DarkThemeToggle';
import DayTimeline from 'components/DayTimeline';

function TopPanel(props) {
	return (
		<div style={props.style}>
			<div className={'top-panel-option'}>
				<TopPageText
					entriesData={props.filteredEntries}
					date={props.date}
					todaysCommits={props.todaysCommits}
				/>
				<DateNavigation date={props.date} setDate={props.setDate} />
				<TimeOptionSelect options={props.options} setOptions={props.setOptions} />
				<TimelineDisplaySelect options={props.options} setOptions={props.setOptions} />
				<GraphToggle options={props.options} setOptions={props.setOptions} />
				<DarkThemeToggle options={props.options} setOptions={props.setOptions} />
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
