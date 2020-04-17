import React from 'react';
import { parseDateObjToLittleEndian, convertUTCISOToUKObj } from 'utility/parseDates';
import { compareObjs } from 'utility/sortAndCompare';

function TimelineToggles(props) {
	function getEventCountForDay(event, date) {
		return props.entriesData.filter((el) => el.type === event && compareObjs(el.date, date)).length;
	}

	return (
		<div>
			<h1>
				<span
					style={{
						display: 'inline-block'
					}}
				>
					Pomodoros for
				</span>
				<span> </span>
				<span
					style={{
						display: 'inline-block',
						width: '14rem'
					}}
				>
					{parseDateObjToLittleEndian(props.filterOptions.date)}
				</span>
			</h1>
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
