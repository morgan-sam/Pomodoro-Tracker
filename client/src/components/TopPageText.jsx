import React from 'react';
import { parseISOToLittleEndian, convertUTCISOToUKObj } from 'utility/parseDates';
import { compareObjs } from 'utility/sortAndCompare';

function TimelineToggles(props) {
	function getEventCountForDay(event, date) {
		return props.entriesData.filter((el) => el.type === event && compareObjs(el.date, date)).length;
	}

	return (
		<div
			style={{
				padding: '0 0 2rem 0'
			}}
		>
			<h1>Pomodoros for {parseISOToLittleEndian(props.filterOptions.date)}</h1>
			<h3>
				Total{' '}
				{compareObjs(props.filterOptions.date, convertUTCISOToUKObj(new Date().toISOString())) ? (
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
