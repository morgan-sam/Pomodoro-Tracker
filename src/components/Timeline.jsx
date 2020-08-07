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

	const hourWidth = remToPx(props.hourWidth);
	const pomodoroWidth = 5 * hourWidth / 12;
	const encoreWidth = hourWidth / 12;

	const timelineHeight = 130;
	const timeRange = options.timeline.endTime - options.timeline.startTime;
	const eventOffsetY = 40;

	const drawTimeline = (ref, entries) => {
		const context = ref.current.getContext('2d');

		context.translate(0.5, 0.5);
		drawTimelineGrid(context);
		addEntries(context, entries);
		drawTimelineOutline(context);
		context.translate(-0.5, -0.5);
	};

	const addEntries = (context, entries) => {
		entries.forEach((el) => {
			const time = el.time.hour + el.time.minute / 60;
			if (el.type === 'pomodoro') drawPomodoro(context, time);
			if (el.type === 'encore') drawEncore(context, time);
		});
	};

	const drawPomodoro = (ctx, time) => {
		ctx.beginPath();
		ctx.fillStyle = colorTheme.light;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		const pos = (time - options.timeline.startTime) * hourWidth - pomodoroWidth;
		ctx.rect(pos, eventOffsetY, pomodoroWidth, timelineHeight - eventOffsetY);
		ctx.fill();
		ctx.stroke();
	};

	const drawEncore = (ctx, time) => {
		ctx.beginPath();
		ctx.fillStyle = colorTheme.dark;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		const pos = (time - options.timeline.startTime) * hourWidth - encoreWidth;
		ctx.rect(pos, eventOffsetY, encoreWidth, timelineHeight - eventOffsetY);
		ctx.fill();
		ctx.stroke();
	};

	const clearTimeline = (ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, timeRange * hourWidth, timelineHeight);
	};

	const drawTimelineGrid = (context) => {
		Array.from(Array(timeRange).keys()).map((i) => drawTimeBox(i, context));
	};

	const drawTimeBox = (index, ctx) => {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		const time = (index + options.timeline.startTime) % 24;
		ctx.rect(hourWidth * index, 0, hourWidth, timelineHeight);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * index, 20);
		ctx.stroke();
	};

	const drawTimelineOutline = (ctx) => {
		ctx.beginPath();
		ctx.rect(0, 0, hourWidth * timeRange - 1, timelineHeight - 1);
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
