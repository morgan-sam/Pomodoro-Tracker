import React, { useEffect, useState } from 'react';

import {
	containerStyle,
	boxStyle,
	textStyle,
	innerGridStyle,
	eventBoxStyle,
	eventBoxTypeStyle
} from '../styles/timelineStyles';

import { convert24hrTo12hrTime, convertISOToTimeObj } from '../utility/timeFunctions';

function DayTimeline(props) {
	const eventLengths = {
		...props.eventLengths,
		start: 1
	};

	const timelineBoxes = [ ...Array(24).keys() ].map((i) => {
		return (
			<div
				key={i}
				style={{
					...boxStyle,
					maxWidth: `${props.timeOptions.hourWidth}rem`,
					minWidth: `${props.timeOptions.hourWidth}rem`,
					zIndex: props.displayOptions.visibility.grid ? '1' : '0'
				}}
			>
				<span style={textStyle}>
					{props.timeOptions.twelveHourClock ? convert24hrTo12hrTime(i) : `${i}:00`}
				</span>
				{getBoxGrid()}
			</div>
		);
	});

	function getBoxGrid() {
		return [ ...Array(4).keys() ].map((i) => {
			return (
				<div
					key={i}
					style={{
						...innerGridStyle,
						display: props.displayOptions.visibility.grid ? 'flex' : 'none',
						left: `${25 * i}%`,
						borderLeft: i ? '1px solid #555' : 'none'
					}}
				/>
			);
		});
	}

	function getEventBoxes(eventType) {
		if (props.displayOptions.visibility[eventType] || eventType === 'pomodoro') {
			const events = props.entries.filter((el) => el.type === eventType);
			return events ? events.map((el, i) => convertEventToBox(el, i)) : [];
		} else {
			return null;
		}
	}

	function convertEventToBox(el, i) {
		const time = convertISOToTimeObj(el.date);
		const hourPosition = time.hours + time.minutes / 60 - eventLengths[el.type] / 60;
		const remPosition = (hourPosition - props.timeOptions.startTime) * props.timeOptions.hourWidth;
		const eventWidth = props.timeOptions.hourWidth / 60 * eventLengths[el.type];
		const overflow = calculateEventOverflow(eventWidth, remPosition);

		const currentEventStyle = {
			left: `${remPosition}rem`,
			width: `calc(${eventWidth - overflow}rem - ${overflow > 0 ? '2' : '0'}px)`,
			display: props.timeOptions.endTime < hourPosition ? 'none' : 'inline-block'
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
		const timelineWidth = (props.timeOptions.endTime - props.timeOptions.startTime) * props.timeOptions.hourWidth;
		const eventEndPosition = eventWidth + remPosition;
		return Math.max(0, eventEndPosition - timelineWidth);
	}

	return (
		<div style={containerStyle}>
			{timelineBoxes.slice(props.timeOptions.startTime, props.timeOptions.endTime)}
			{getEventBoxes('start')}
			{getEventBoxes('pomodoro')}
			{getEventBoxes('encore')}
		</div>
	);
}

export default DayTimeline;