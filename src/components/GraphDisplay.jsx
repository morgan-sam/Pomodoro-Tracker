import React, { useEffect, useRef } from 'react';
import { addOrSubtractDaysFromISODate } from 'data/dates';

const GraphDisplay = (props) => {
	function drawX(coordinate, size) {
		const context = canvasRef.current.getContext('2d');
		const { x, y } = coordinate;
		context.beginPath();
		context.moveTo(x - size, y - size);
		context.lineTo(x + size, y + size);
		context.moveTo(x + size, y - size);
		context.lineTo(x - size, y + size);
		context.stroke();
	}
	const canvasRef = React.useRef(null);

	useEffect(
		() => {
			canvasRef.current.width = 750;
			canvasRef.current.height = 500;
			addDataToGraph();
		},
		[ props ]
	);

	const getPomodoroDayCount = () => {
		const dateArray = props.entriesData.flatMap(
			(el) => (el.type === 'pomodoro' ? [ el.date.substring(0, 10) ] : [])
		);
		let counts = {};
		dateArray.forEach((el) => {
			if (counts[el]) counts[el] += 1;
			else counts[el] = 1;
		});
		return counts;
	};

	const getWeekCount = (startDate) => {
		const counts = getPomodoroDayCount();
		if (!(Object.keys(counts).length === 0 && counts.constructor === Object)) {
			let weekArray = [];
			for (let i = 0; i < 7; i++) {
				const today = addOrSubtractDaysFromISODate(startDate, i).substring(0, 10);
				weekArray[today] = counts[today] ? counts[today] : 0;
			}
			return weekArray;
		} else return {};
	};

	const addDataToGraph = () => {
		const counts = getWeekCount(props.filterOptions.date);
		const xUnit = canvasRef.current.width / Object.values(counts).length;
		const YUnit = canvasRef.current.height / Math.max(...Object.values(counts));
		Object.entries(counts).forEach((el, i) => {
			drawX({ x: xUnit * i, y: canvasRef.current.height - YUnit * el[1] }, 10);
		});
	};

	const graphStyle = {
		display: 'flex',
		height: '20rem',
		width: '30rem',
		border: '1px solid black'
	};

	return <canvas ref={canvasRef} style={graphStyle} onClick={(e) => {}} />;
};

export default GraphDisplay;
