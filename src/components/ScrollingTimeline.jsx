import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);

	const hourWidth = 70;
	const timelineHeight = 100;

	useEffect(() => {
		drawTimeline();
	}, []);

	const drawTimeline = () => {
		Array.from(Array(24).keys()).map((i) => drawTimeBox(i));
	};

	const drawTimeBox = (time) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(0, 0, hourWidth * (time + 1), timelineHeight);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * time, 20);
		ctx.stroke();
	};

	return <canvas ref={canvasRef} width={24 * hourWidth} height={timelineHeight} />;
};

export default ScrollingTimeline;
