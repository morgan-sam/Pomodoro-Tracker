import React, { useEffect } from 'react';
import { addOrSubtractDaysFromISODate, daysInMonth, monthStringArray, addOrSubtractDaysFromDateObj } from 'data/dates';
import {
	parseBigEndianToObj,
	parseISOToDateObj,
	parseDateObjToISO,
	parseDateObjToLittleEndian
} from 'utility/parseDates';

const GraphPanel = (props) => {
	const GRAPH_TOP_GAP = 100;
	const GRAPH_BOTTOM_GAP = 100;
	const GRAPH_LEFT_GAP = 100;
	const GRAPH_RIGHT_GAP = 50;

	function getXAxisLabel(date) {
		const dateObj = parseBigEndianToObj(date);
		const shortDayString = new Date(`${date}T00:00:00.000Z`).toString().substring(0, 3);
		if (props.period === 'week') return [ shortDayString, `${dateObj.day}/${dateObj.month}` ];
		if (props.period === 'month') return [ `${parseInt(dateObj.day)}` ];
	}

	function getXAxisFont() {
		if (props.period === 'week') return (20 | 0) + 'px sans-serif';
		if (props.period === 'month') return (13 | 0) + 'px sans-serif';
	}

	function drawGraphTitle(counts) {
		const context = canvasRef.current.getContext('2d');
		context.beginPath();
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.font = (20 | 0) + 'px sans-serif';
		context.fillText(getGraphTitleText(counts), canvasRef.current.width / 2, 40);
		context.stroke();
	}

	function getGraphTitleText(counts) {
		const dateObj = parseBigEndianToObj(Object.keys(counts)[0]);
		if (props.period === 'week') {
			const nextWeekDateObj = addOrSubtractDaysFromDateObj(dateObj, 6);
			return `Pomodoros from ${parseDateObjToLittleEndian(dateObj)} to ${parseDateObjToLittleEndian(
				nextWeekDateObj
			)} `;
		}
		if (props.period === 'month') {
			return `Pomodoros in ${monthStringArray[parseInt(dateObj.month) - 1]} ${dateObj.year}`;
		}
	}

	function drawGraphData(graphData) {
		if (props.type === 'scatter') {
			drawCoordinateCrosses(graphData, 10);
		}
		if (props.type === 'line') {
			drawGraphLine(graphData);
		}
		if (props.type === 'both') {
			drawGraphLine(graphData);
			drawCoordinateCrosses(graphData, 10);
		}
	}

	function drawGraphLine(graphData) {
		const context = canvasRef.current.getContext('2d');
		context.beginPath();
		graphData.forEach((el) => {
			context.lineTo(el.coordinate.x, el.coordinate.y);
		});
		context.stroke();
	}

	function drawCoordinateCrosses(graphData, size) {
		const context = canvasRef.current.getContext('2d');
		graphData.forEach((el) => {
			const { x, y } = el.coordinate;
			context.beginPath();
			context.moveTo(x - size, y - size);
			context.lineTo(x + size, y + size);
			context.moveTo(x + size, y - size);
			context.lineTo(x - size, y + size);
			context.stroke();
		});
	}

	function drawXAxis(graphData) {
		const context = canvasRef.current.getContext('2d');
		graphData.forEach((el) => {
			const x = el.coordinate.x;
			context.beginPath();
			context.moveTo(x, canvasRef.current.height);
			context.lineTo(x, canvasRef.current.height - 20);
			context.stroke();
			const dateText = getXAxisLabel(el.date).reverse();
			context.textAlign = 'center';
			context.font = getXAxisFont();
			for (let i = 0; i < dateText.length; i++) {
				context.beginPath();
				context.fillText(dateText[i], x, canvasRef.current.height - 40 - 20 * i);
				context.stroke();
			}
		});
	}

	function drawYAxis(counts, YUnit) {
		const maxValue = Math.max(...Object.values(counts));
		const context = canvasRef.current.getContext('2d');
		if (maxValue) {
			for (let i = 0; i <= maxValue; i++) {
				context.beginPath();
				context.moveTo(0, GRAPH_TOP_GAP + i * YUnit);
				context.lineTo(20, GRAPH_TOP_GAP + i * YUnit);
				context.textBaseline = 'middle';
				context.textAlign = 'center';
				context.font = (20 | 0) + 'px sans-serif';
				context.fillText(maxValue - i, 40, i * YUnit + GRAPH_TOP_GAP);
				context.stroke();
			}
		} else {
			context.beginPath();
			context.textBaseline = 'middle';
			context.textAlign = 'center';
			context.font = (20 | 0) + 'px sans-serif';
			context.fillText(
				'No data available for date range',
				canvasRef.current.width / 2,
				canvasRef.current.height / 2
			);
			context.stroke();
		}
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
		return createCountArray(startDate, 7);
	};

	const getMonthCount = (startDate) => {
		const dateObj = parseISOToDateObj(startDate);
		const monthLength = daysInMonth(dateObj.month, dateObj.year);
		const startOfMonth = parseDateObjToISO({ ...dateObj, day: 1 });
		return createCountArray(startOfMonth, monthLength);
	};

	const createCountArray = (startDate, amountOfDays) => {
		const counts = getPomodoroDayCount();
		let countArray = {};
		for (let i = 0; i < amountOfDays; i++) {
			const today = addOrSubtractDaysFromISODate(startDate, i).substring(0, 10);
			countArray[today] = counts[today] ? counts[today] : 0;
		}
		return countArray;
	};

	const addDataToGraph = () => {
		const counts =
			props.period === 'week' ? getWeekCount(props.filterOptions.date) : getMonthCount(props.filterOptions.date);
		const units = getUnits(counts);
		const graphData = getGraphData(counts, units);
		drawGraphTitle(counts);
		drawYAxis(counts, units.y);
		drawXAxis(graphData);
		drawGraphData(graphData);
	};

	function getUnits(counts) {
		const x = (canvasRef.current.width - GRAPH_LEFT_GAP - GRAPH_RIGHT_GAP) / (Object.values(counts).length - 1);
		const y = (canvasRef.current.height - GRAPH_TOP_GAP - GRAPH_BOTTOM_GAP) / Math.max(...Object.values(counts));
		return { x, y };
	}

	function getGraphData(counts, units) {
		return Object.entries(counts).map((el, i) => {
			return {
				date: el[0],
				coordinate: {
					x: GRAPH_LEFT_GAP + units.x * i,
					y: canvasRef.current.height - GRAPH_BOTTOM_GAP - units.y * el[1]
				}
			};
		});
	}

	const graphStyle = {
		display: 'flex',
		height: '20rem',
		width: '30rem',
		border: '1px solid black'
	};

	return <canvas ref={canvasRef} style={graphStyle} onClick={(e) => {}} />;
};

export default GraphPanel;
