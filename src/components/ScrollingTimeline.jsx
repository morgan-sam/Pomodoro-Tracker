import React from 'react';
import { useEffect, useRef } from 'react';
import { randInt, randBoo } from 'utility/random';
import { drawTimeline } from 'controller/drawTimeline';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);
	const canvasRef2 = useRef(null);

	const hourWidth = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue('--scrolling-timeline-hour-width');
	const pomodoroWidth = 5 * hourWidth / 12;
	const encoreWidth = hourWidth / 12;

	const timelineHeight = 130;

	const pomodoroColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-mid');
	const encoreColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-dark');

	useEffect(() => {
		const timelineOptions = {
			timeRange: 24,
			hourWidth,
			pomodoroWidth,
			encoreWidth,
			timelineHeight,
			eventOffsetY: 40,
			color: {
				pomodoro: pomodoroColor,
				encore: encoreColor
			},
			startTime: 0
		};
		drawTimeline({ ...timelineOptions, context: canvasRef.current.getContext('2d') }, generateRandomEvents());
		drawTimeline({ ...timelineOptions, context: canvasRef2.current.getContext('2d') }, generateRandomEvents());
	}, []);

	const curTimeToEventTime = (curTime) => ({ hour: Math.floor(curTime / 60), minute: curTime % 60 });

	const generateRandomEvents = () => {
		let events = [];
		let curTime = 0;
		while (curTime < 23 * 60) {
			const combo = randInt(1, 4, 5);
			for (let i = 0; i < combo; i++) {
				curTime += 25;
				events.push({
					type: 'pomodoro',
					time: curTimeToEventTime(curTime)
				});
				if (randBoo()) {
					curTime += 5;
					events.push({
						type: 'encore',
						time: curTimeToEventTime(curTime)
					});
				}
				if (curTime > 23 * 60) break;
			}
			curTime += randInt(5, 60, 1.4);
		}
		return events;
	};

	return (
		<div className="scrolling-timeline-container" style={{ height: `${timelineHeight}px` }}>
			<canvas className="scrolling-timeline" ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />
			<canvas className="scrolling-timeline" ref={canvasRef2} width={24 * hourWidth} height={timelineHeight} />
		</div>
	);
};

export default ScrollingTimeline;
