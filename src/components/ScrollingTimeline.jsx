import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';
import { randInt } from 'utility/random';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);

	const hourWidth = 90;
	const timelineHeight = 130;

	const color = window.getComputedStyle(document.documentElement).getPropertyValue('--color1-mid');

	useEffect(() => {
		drawTimeline();
	}, []);

	const drawTimeline = () => {
		Array.from(Array(24).keys()).map((i) => drawTimeBox(i));
		addEvents();
	};

	const addEvents = () => {
		let curPos = 0;
		while (curPos < hourWidth * 24) {
			// const noOfPomodoros = randInt(1, 4);
			drawPomodoro(curPos);
			curPos += hourWidth / 2 + 15;
		}
	};

	const drawPomodoro = (pos) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.rect(pos, 40, hourWidth / 2, timelineHeight);
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

	return <canvas ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />;
};

export default ScrollingTimeline;
