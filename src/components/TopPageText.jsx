import React from 'react';
import { parseISOToLittleEndian } from 'utility/parseDates';

function TimelineToggles(props) {
	function getEventCountForDay(event, date) {
		return props.entriesData.filter((el) => el.type === event && el.date.substring(0, 10) === date.substring(0, 10))
			.length;
	}

	return (
		<div>
			<h1>Pomodoros for {parseISOToLittleEndian(props.filterOptions.date).replace(new RegExp('/', 'g'), '-')}</h1>
			<h3>
				Total{' '}
				{props.filterOptions.date.substring(0, 10) === new Date().toISOString().substring(0, 10) ? (
					'for today'
				) : (
					''
				)}:{' '}
			</h3>
			<h2>Pomodoros: {getEventCountForDay('pomodoro', props.filterOptions.date)}</h2>
		</div>
	);
}

export default TimelineToggles;
