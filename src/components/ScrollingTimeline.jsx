import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { randInt, randBoo } from 'utility/random';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);

	const hourWidth = 90;
	const pomodoroWidth = 5 * hourWidth / 12;
	const encoreWidth = hourWidth / 12;

	const timelineHeight = 130;

	const pomodoroColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-mid');
	const encoreColor = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-dark');

	useEffect(() => {
		drawTimeline();
	}, []);

	const drawTimeline = () => {
		Array.from(Array(24).keys()).map((i) => drawTimeBox(i));
		addEvents();
		drawTimelineOutline();
	};

	const addEvents = () => {
		let curPos = 0;
		while (curPos < hourWidth * 24) {
			const combo = randInt(1, 4, 5);
			for (let i = 0; i < combo; i++) {
				drawPomodoro(curPos);
				curPos += pomodoroWidth;
				if (randBoo()) {
					drawEncore(curPos);
					curPos += encoreWidth;
				}
			}
			curPos += randInt(5, 100, 1.4);
		}
	};

	const drawPomodoro = (pos) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = pomodoroColor;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.rect(pos, 40, pomodoroWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const drawEncore = (pos) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = encoreColor;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.rect(pos, 40, encoreWidth, timelineHeight);
		ctx.fill();
		ctx.stroke();
	};

	const drawTimeBox = (time) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(hourWidth * time, 0, hourWidth, timelineHeight);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * time, 20);
		ctx.stroke();
	};

	const drawTimelineOutline = () => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(0, 0, hourWidth * 24, timelineHeight - 1);
		ctx.stroke();
	};

	return <canvas ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />;
};

export default ScrollingTimeline;
