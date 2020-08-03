import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { randInt, randBoo } from 'utility/random';

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
		drawTimeline(canvasRef);
		drawTimeline(canvasRef2);
	}, []);

	const drawTimeline = (ref) => {
		Array.from(Array(24).keys()).map((i) => drawTimeBox(i, ref));
		addEvents(ref);
		drawTimelineOutline(ref);
	};

	const addEvents = (ref) => {
		let curPos = 0;
		while (curPos < hourWidth * 23) {
			const combo = randInt(1, 4, 5);
			for (let i = 0; i < combo; i++) {
				drawPomodoro(curPos, ref);
				curPos += pomodoroWidth;
				if (randBoo()) {
					drawEncore(curPos, ref);
					curPos += encoreWidth;
				}
				if (curPos > hourWidth * 23) break;
			}
			curPos += randInt(5, 100, 1.4);
		}
	};

	const drawPomodoro = (pos, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = pomodoroColor;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.rect(pos, 40, pomodoroWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const drawEncore = (pos, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = encoreColor;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.rect(pos, 40, encoreWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const drawTimeBox = (time, ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(hourWidth * time, 0, hourWidth, timelineHeight);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * time, 20);
		ctx.stroke();
	};

	const drawTimelineOutline = (ref) => {
		const ctx = ref.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(0, 0, hourWidth * 24, timelineHeight);
		ctx.stroke();
	};

	return (
		<div className="canvas-container" style={{ height: `${timelineHeight}px` }}>
			<canvas className="canvas-timeline" ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />
			<canvas className="canvas-timeline-2" ref={canvasRef2} width={24 * hourWidth} height={timelineHeight} />
		</div>
	);
};

export default ScrollingTimeline;
