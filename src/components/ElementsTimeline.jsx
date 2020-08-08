import React, { useContext } from 'react';
import {
	getBoxStyle,
	innerGridStyle,
	getDefaultEventBoxStyle,
	getEventBoxTypeStyle,
	getCurrentTimeMarkerStyle
} from 'styles/Timeline';
import { getTodaysDateAsObj } from 'data/dates';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { DarkThemeContext, ColorThemeContext } from 'context/theme';

function ElementsTimeline(props) {
	const darkTheme = useContext(DarkThemeContext);
	const colorTheme = useContext(ColorThemeContext);
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
						...getBoxStyle(darkTheme),
						maxWidth: `${props.hourWidth}rem`,
						minWidth: `${props.hourWidth}rem`,
						zIndex: props.options.timeline.grid ? '1' : '0'
					}}
				>
					<span className={'elements-timeline-text'}>
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
					...getDefaultEventBoxStyle(darkTheme),
					...getEventBoxTypeStyle(colorTheme)[el.type],
					...getEventBoxStyle(el)
				}}
			/>
		);
	}

	function getEventBoxStyle(el) {
		const hourPosition = calculateEventHourPosition(el);
		const remPosition = (hourPosition - props.options.timeline.startTime) * props.hourWidth;
		const eventWidth = props.hourWidth / 60 * eventLengths[el.type];
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
		const timelineWidth = (props.options.timeline.endTime - props.options.timeline.startTime) * props.hourWidth;
		const eventEndPosition = eventWidth + remPosition;
		return Math.max(0, eventEndPosition - timelineWidth);
	}

	const currentTimeMarker = () => {
		const width = props.hourWidth;
		const { hour, minute } = getTodaysDateAsObj().time;
		const time = width * (minute / 60 + hour - props.options.timeline.startTime);
		return <div style={{ ...getCurrentTimeMarkerStyle(colorTheme), left: `${time}rem` }} />;
	};

	return (
		<div className={'elements-timeline'}>
			<div className={'elements-timeline-scrollbar'}>
				{getTimelineBoxSelection(props.options.timeline.startTime, props.options.timeline.endTime)}
				{getEventBoxes('start')}
				{getEventBoxes('pomodoro')}
				{getEventBoxes('encore')}
				{currentTimeMarker()}
			</div>
		</div>
	);
}

export default ElementsTimeline;
