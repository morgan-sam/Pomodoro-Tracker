import React from 'react';
import { useEffect, useRef } from 'react';
import { convert24hrTo12hrTime } from 'utility/parseTime';

const ScrollingTimeline = (props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		drawTimeline();
	}, []);

	const drawTimeline = () => {
		Array.from(Array(24).keys()).map((i) => drawTimeBox(i));
	};

	const drawTimeBox = (time) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.beginPath();
		ctx.rect(0, 0, 100 * (time + 1), 100);
		ctx.font = '15px Roboto';
		ctx.fillText(`${convert24hrTo12hrTime(time)}`, 5 + 100 * time, 20);
		ctx.stroke();
	};

	return <canvas ref={canvasRef} width={2400} height={100} />;
};

export default ScrollingTimeline;
