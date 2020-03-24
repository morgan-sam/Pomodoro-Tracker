import React, { useEffect, useState } from 'react';

import {
	containerStyle,
	boxStyle,
	textStyle,
	innerGridStyle,
	eventBoxStyle,
	eventBoxTypeStyle
} from './styles/timelineStyles';

function DayTimeline(props) {
	const eventLengths = {
		...props.eventLengths,
		start: 1
	};

	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 24,
		twelveHourClock: true,
		hourWidth: 5
	});

	const timelineBoxes = [ ...Array(24).keys() ].map((i) => {
		const innerGrid = [ ...Array(4).keys() ].map((i) => {
			return (
				<div
					key={i}
					style={{
						...innerGridStyle,
						display: props.visibility.grid ? 'flex' : 'none',
						left: `${25 * i}%`,
						borderLeft: i ? '1px solid #555' : 'none'
					}}
				/>
			);
		});

		return (
			<div
				key={i}
				style={{
					...boxStyle,
					maxWidth: `${timeOptions.hourWidth}rem`,
					minWidth: `${timeOptions.hourWidth}rem`,
					zIndex: props.visibility.grid ? '1' : '0'
				}}
			>
				<span style={textStyle}>{timeOptions.twelveHourClock ? convert24hrTo12hrTime(i) : `${i}:00`}</span>
				{innerGrid}
			</div>
		);
	});

	function getStartLines() {
		if (props.visibility.start) {
			const startEvents = props.entries.filter((el) => el.type === 'start');
			return startEvents ? startEvents.map((el, i) => convertEventToBox(el, i)) : [];
		} else {
			return null;
		}
	}

	function getPomodoroBoxes() {
		const pomodoroEvents = props.entries.filter((el) => el.type === 'pomodoro');
		return pomodoroEvents ? pomodoroEvents.map((el, i) => convertEventToBox(el, i)) : [];
	}

	function getEncoreBoxes() {
		if (props.visibility.encore) {
			const encoreEvents = props.entries.filter((el) => el.type === 'encore');
			return encoreEvents ? encoreEvents.map((el, i) => convertEventToBox(el, i)) : [];
		} else {
			return null;
		}
	}

	function convertEventToBox(el, i) {
		const time = convertISOToTimeObj(el.date);
		const hourPosition = time.hours + time.minutes / 60 - eventLengths[el.type] / 60;
		const remPosition = (hourPosition - timeOptions.startTime) * timeOptions.hourWidth;
		const eventWidth = timeOptions.hourWidth / 60 * eventLengths[el.type];
		const overflow = calculateEventOverflow(eventWidth, remPosition);

		const currentEventStyle = {
			left: `${remPosition}rem`,
			width: `calc(${eventWidth - overflow}rem - ${overflow > 0 ? '2' : '0'}px)`,
			display: timeOptions.endTime < hourPosition ? 'none' : 'inline-block'
		};
		return (
			<div
				key={i}
				style={{
					...eventBoxStyle,
					...eventBoxTypeStyle[el.type],
					...currentEventStyle
				}}
			/>
		);
	}

	function calculateEventOverflow(eventWidth, remPosition) {
		const timelineWidth = (timeOptions.endTime - timeOptions.startTime) * timeOptions.hourWidth;
		const eventEndPosition = eventWidth + remPosition;
		return Math.max(0, eventEndPosition - timelineWidth);
	}

	function convert24hrTo12hrTime(i) {
		const period = i < 12 ? 'am' : 'pm';
		let newTime = i % 12;
		if (newTime === 0) newTime = 12;
		return newTime + period;
	}

	function convertISOToTimeObj(isoString) {
		const timeLetters = isoString.split('').slice(11, 17);
		return {
			hours: parseInt(timeLetters[0] + timeLetters[1]),
			minutes: parseInt(timeLetters[3] + timeLetters[4])
		};
	}

	return (
		<div style={containerStyle}>
			{timelineBoxes.slice(timeOptions.startTime, timeOptions.endTime)}
			{getStartLines()}
			{getPomodoroBoxes()}
			{getEncoreBoxes()}
		</div>
	);
}

export default DayTimeline;
