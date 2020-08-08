import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { randInt, randBoo } from 'utility/random';
import { drawTimeline, clearTimeline } from 'controller/drawTimeline';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);
	const canvasRef2 = useRef(null);

	const hourWidth = window.getComputedStyle(document.documentElement).getPropertyValue('--canvas-hour-width');
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
		const events = generateRandomEvents();
		const events2 = generateRandomEvents();
		drawTimeline({ ...timelineOptions, context: canvasRef.current.getContext('2d') }, events);
		drawTimeline({ ...timelineOptions, context: canvasRef2.current.getContext('2d') }, events2);
	}, []);

	const generateRandomEvents = () => {
		let events = [];
		let curTime = 0;
		while (curTime < 23 * 60) {
			console.log(curTime);
			const combo = randInt(1, 4, 5);
			for (let i = 0; i < combo; i++) {
				curTime += 25;
				events.push({
					type: 'pomodoro',
					time: { hour: Math.floor(curTime / 60), minute: curTime % 60 }
				});
				if (randBoo()) {
					curTime += 5;
					events.push({
						type: 'encore',
						time: { hour: Math.floor(curTime / 60), minute: curTime % 60 }
					});
				}
				if (curTime > 23 * 60) break;
			}
			curTime += randInt(5, 100, 1.4);
		}
		return events;
	};

	return (
		<div className="canvas-timeline-container" style={{ height: `${timelineHeight}px` }}>
			<canvas className="canvas-timeline" ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />
			<canvas className="canvas-timeline" ref={canvasRef2} width={24 * hourWidth} height={timelineHeight} />
		</div>
	);
};

export default ScrollingTimeline;
