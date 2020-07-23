import React from 'react';
import TopPageText from 'components/TopPageText';
import TimelineDateSelect from 'components/TimelineDateSelect';
import optionselect from 'components/TimeOptionSelect';
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
					date={props.date}
					todaysCommits={props.todaysCommits}
				/>
				<TimelineDateSelect date={props.date} setDate={props.setDate} />
				<optionselect options={props.options} setOptions={props.setOptions} />
				<TimelineOptions
					options={props.options}
					setOptions={props.setOptions}
					options={props.options}
					setOptions={props.setOptions}
				/>
				<GraphToggle options={props.options} setOptions={props.setOptions} />
				<DarkThemeToggle options={props.options} setOptions={props.setOptions} />
			</div>
			<DayTimeline
				hourWidth={props.hourWidth}
				entries={props.filteredEntries}
				eventLengths={props.eventLengths}
				options={props.options}
				options={props.options}
			/>
		</div>
	);
}
export default TopPanel;
