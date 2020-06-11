import React from 'react';
import {
	containerStyle,
	scrollbarStyle,
	getBoxStyle,
	textStyle,
	innerGridStyle,
	defaultEventBoxStyle,
	eventBoxTypeStyle,
	currentTimeMarkerStyle
} from 'styles/dayTimeline';
import { getTodaysDateAsObj } from 'data/dates';
import { convert24hrTo12hrTime } from 'utility/parseTime';

function DayTimeline(props) {
	const eventLengths = {
		...props.eventLengths,
		start: 1
	};
	console.log(props.displayOptions);
	function getTimelineBoxSelection(start, end) {
		return [ ...Array(end - start).keys() ].map((i) => {
			return (
				<div
					key={i}
					style={{
						...getBoxStyle(props.displayOptions.darkTheme),
						maxWidth: `${props.timeOptions.hourWidth}rem`,
						minWidth: `${props.timeOptions.hourWidth}rem`,
						zIndex: props.displayOptions.timeline.grid ? '1' : '0'
					}}
				>
					<span style={textStyle}>
						{props.timeOptions.twelveHourClock ? convert24hrTo12hrTime(i + start) : `${i + start}:00`}
					</span>
					{getBoxGrid()}
				</div>
			);
		});
	}

	function getBoxGrid() {
		return [ ...Array(4).keys() ].map((i) => {
			return (
				<div
					key={i}
					style={{
						...innerGridStyle,
						display: props.displayOptions.timeline.grid ? 'flex' : 'none',
						left: `${25 * i}%`,
						borderLeft: i ? '1px solid #555' : 'none'
					}}
				/>
			);
		});
	}

	function getEventBoxes(eventType) {
		if (props.displayOptions.timeline[eventType] || eventType === 'pomodoro') {
			const events = props.entries.filter((el) => el.type === eventType);
			return events ? events.map((el, i) => convertEventToBox(el, i)) : [];
		} else {
			return null;
		}
	}

	function convertEventToBox(el, i) {
		return (
			<div
				key={i}
				style={{
					...defaultEventBoxStyle,
					...eventBoxTypeStyle[el.type],
					...getEventBoxStyle(el)
				}}
			/>
		);
	}

	function getEventBoxStyle(el) {
		const hourPosition = calculateEventHourPosition(el);
		const remPosition = (hourPosition - props.timeOptions.startTime) * props.timeOptions.hourWidth;
		const eventWidth = props.timeOptions.hourWidth / 60 * eventLengths[el.type];
		const overflow = calculateEventOverflow(eventWidth, remPosition);

		return {
			left: `${remPosition}rem`,
			width: `calc(${eventWidth - overflow}rem - ${overflow > 0 ? '2' : '0'}px)`,
			display: props.timeOptions.endTime < hourPosition ? 'none' : 'inline-block'
		};
	}

	function calculateEventHourPosition(el) {
		return el.time.hour + el.time.minute / 60 - eventLengths[el.type] / 60;
	}

	function calculateEventOverflow(eventWidth, remPosition) {
		const timelineWidth = (props.timeOptions.endTime - props.timeOptions.startTime) * props.timeOptions.hourWidth;
		const eventEndPosition = eventWidth + remPosition;
		return Math.max(0, eventEndPosition - timelineWidth);
	}

	const currentTimeMarker = () => {
		const width = props.timeOptions.hourWidth;
		const { hour, minute } = getTodaysDateAsObj().time;
		const time = width * (minute / 60 + hour - props.timeOptions.startTime);
		return <div style={{ ...currentTimeMarkerStyle, left: `${time}rem` }} />;
	};

	return (
		<div style={{ ...containerStyle, ...props.style }}>
			<div style={scrollbarStyle}>
				{getTimelineBoxSelection(props.timeOptions.startTime, props.timeOptions.endTime)}
				{getEventBoxes('start')}
				{getEventBoxes('pomodoro')}
				{getEventBoxes('encore')}
				{currentTimeMarker()}
			</div>
		</div>
	);
}

export default DayTimeline;
