import React, { useContext, useRef, useEffect } from 'react';
import { getCurrentTimeMarkerStyle } from 'styles/Timeline';
import { getTodaysDateAsObj } from 'data/dates';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { DarkThemeContext, ColorThemeContext } from 'context/theme';
import { remToPx } from 'utility/convertUnit';

function DayTimeline(props) {
	const { options, entries } = props;
	const canvasRef = useRef(null);
	const darkTheme = useContext(DarkThemeContext);
	const colorTheme = useContext(ColorThemeContext);
	const eventLengths = {
		...props.eventLengths,
		start: 1
	};
	console.log(entries);

	const hourWidth = remToPx(props.hourWidth);
	const pomodoroWidth = 5 * hourWidth / 12;
	const encoreWidth = hourWidth / 12;

	const timelineHeight = 130;
	const timeRange = options.timeline.endTime - options.timeline.startTime;

	const pomodoroColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-mid');
	const encoreColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-dark');

	const drawTimeline = (ref, entries) => {
		drawTimelineGrid(ref);
		addEntries(ref, entries);
		drawTimelineOutline(ref);
	};

	const addEntries = (ref, entries) => {
		entries.forEach((el) => {
			const time = el.time.hour + el.time.minute / 60;
			if (el.type === 'pomodoro') drawPomodoro(time, ref);
			if (el.type === 'encore') drawEncore(time, ref);
		});
	};

	const drawPomodoro = (time, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = colorTheme.light;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		const pos = (time - options.timeline.startTime) * hourWidth - pomodoroWidth;
		ctx.rect(pos, 40, pomodoroWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const drawEncore = (time, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = colorTheme.dark;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		const pos = (time - options.timeline.startTime) * hourWidth - encoreWidth;
		ctx.rect(pos, 40, encoreWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const clearTimeline = (ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, timeRange * hourWidth, timelineHeight);
	};

	const drawTimelineGrid = (ref) => {
		Array.from(Array(timeRange).keys()).map((i) => drawTimeBox(i, ref));
	};

	const drawTimeBox = (index, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = 'black';
		const time = (index + options.timeline.startTime) % 24;
		ctx.rect(hourWidth * index, 0, hourWidth, timelineHeight);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * index, 20);
		ctx.stroke();
	};

	const drawTimelineOutline = (ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(0, 0, hourWidth * timeRange, timelineHeight);
		ctx.stroke();
	};

	useEffect(
		() => {
			clearTimeline(canvasRef);
			drawTimeline(canvasRef, entries);
		},
		[ entries ]
	);

	return <canvas ref={canvasRef} className={'daytimeline'} width={timeRange * hourWidth} height={timelineHeight} />;
}

export default DayTimeline;
