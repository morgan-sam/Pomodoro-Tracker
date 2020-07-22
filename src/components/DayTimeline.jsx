import React from 'react';
import {
	getBoxStyle,
	textStyle,
	innerGridStyle,
	getDefaultEventBoxStyle,
	getEventBoxTypeStyle,
	currentTimeMarkerStyle
} from 'styles/dayTimeline';
import { getTodaysDateAsObj } from 'data/dates';
import { convert24hrTo12hrTime } from 'utility/parseTime';

function DayTimeline(props) {
	const eventLengths = {
		...props.eventLengths,
		start: 1
	};

	function getTimelineBoxSelection(start, end) {
		return [ ...Array(end - start).keys() ].map((i) => {
			return (
				<div
					key={i}
					style={{
						...getBoxStyle(props.options.darkTheme),
						maxWidth: `${props.options.timeline.hourWidth}rem`,
						minWidth: `${props.options.timeline.hourWidth}rem`,
						zIndex: props.options.timeline.grid ? '1' : '0'
					}}
				>
					<span className={'daytimeline-text'}>
						{props.options.timeline.twelveHourClock ? convert24hrTo12hrTime(i + start) : `${i + start}:00`}
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
						display: props.options.timeline.grid ? 'flex' : 'none',
						left: `${25 * i}%`,
						borderLeft: i ? '1px solid #555' : 'none'
					}}
				/>
			);
		});
	}

	function getEventBoxes(eventType) {
		if (props.options.timeline[eventType] || eventType === 'pomodoro') {
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
					...getDefaultEventBoxStyle(props.options.darkTheme),
					...getEventBoxTypeStyle(props.options.darkTheme)[el.type],
					...getEventBoxStyle(el)
				}}
			/>
		);
	}

	function getEventBoxStyle(el) {
		const hourPosition = calculateEventHourPosition(el);
		const remPosition = (hourPosition - props.options.timeline.startTime) * props.options.timeline.hourWidth;
		const eventWidth = props.options.timeline.hourWidth / 60 * eventLengths[el.type];
		const overflow = calculateEventOverflow(eventWidth, remPosition);

		return {
			left: `${remPosition}rem`,
			width: `calc(${eventWidth - overflow}rem - ${overflow > 0 ? '2' : '0'}px)`,
			display: props.options.timeline.endTime < hourPosition ? 'none' : 'inline-block'
		};
	}

	function calculateEventHourPosition(el) {
		return el.time.hour + el.time.minute / 60 - eventLengths[el.type] / 60;
	}

	function calculateEventOverflow(eventWidth, remPosition) {
		const timelineWidth =
			(props.options.timeline.endTime - props.options.timeline.startTime) * props.options.timeline.hourWidth;
		const eventEndPosition = eventWidth + remPosition;
		return Math.max(0, eventEndPosition - timelineWidth);
	}

	const currentTimeMarker = () => {
		const width = props.options.timeline.hourWidth;
		const { hour, minute } = getTodaysDateAsObj().time;
		const time = width * (minute / 60 + hour - props.options.timeline.startTime);
		return <div style={{ ...currentTimeMarkerStyle, left: `${time}rem` }} />;
	};

	return (
		<div className={'daytimeline'} style={{ ...props.style }}>
			<div className={'daytimeline-scrollbar'}>
				{getTimelineBoxSelection(props.options.timeline.startTime, props.options.timeline.endTime)}
				{getEventBoxes('start')}
				{getEventBoxes('pomodoro')}
				{getEventBoxes('encore')}
				{currentTimeMarker()}
			</div>
		</div>
	);
}

export default DayTimeline;
