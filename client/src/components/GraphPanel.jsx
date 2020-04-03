import React, { useEffect } from 'react';
import { monthStringArray, addOrSubtractDaysFromDateObj } from 'data/dates';
import { parseBigEndianToObj, parseDateObjToLittleEndian } from 'utility/parseDates';
import { remToPx } from 'utility/convertUnit';
import { getPomodoroCount } from 'data/graphData';
import { graphStyle } from 'styles/graphPanel';

const GraphPanel = (props) => {
	const GRAPH_TOP_GAP = remToPx(5);
	const GRAPH_BOTTOM_GAP = remToPx(5);
	const GRAPH_LEFT_GAP = remToPx(5);
	const GRAPH_RIGHT_GAP = remToPx(3);
	const GRAPH_FONT_SIZE = remToPx(1);
	const Y_AXIS_MAX = props.maxPomodoro;

	function getCanvasContext() {
		const context = canvasRef.current.getContext('2d');
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		return context;
	}

	function getXAxisLabelText(date) {
		const dateObj = parseBigEndianToObj(date);
		const shortDayString = new Date(`${date}T00:00:00.000Z`).toString().substring(0, 3);
		if (props.period.match(/week/)) return [ shortDayString, `${dateObj.day}/${dateObj.month}` ];
		if (props.period === 'month') return [ `${parseInt(dateObj.day)}` ];
	}

	function getXAxisFont() {
		if (props.period.match(/week/)) return ((GRAPH_FONT_SIZE / 1.2) | 0) + 'px sans-serif';
		if (props.period === 'month') return ((GRAPH_FONT_SIZE / 1.5) | 0) + 'px sans-serif';
	}

	function drawGraphTitle(counts) {
		let context = getCanvasContext();
		context.font = ((GRAPH_FONT_SIZE * 1.2) | 0) + 'px sans-serif';
		context.fillText(getGraphTitleText(counts), canvasRef.current.width / 2, GRAPH_FONT_SIZE * 2);
	}

	function getGraphTitleText(counts) {
		const dateObj = parseBigEndianToObj(Object.keys(counts)[0]);
		if (props.period.match(/week/)) return getWeekGraphTitleRange(dateObj);
		if (props.period === 'month')
			return `Pomodoros in ${monthStringArray[parseInt(dateObj.month) - 1]} ${dateObj.year}`;
	}

	function getWeekGraphTitleRange(firstDate) {
		const secondDate = addOrSubtractDaysFromDateObj(firstDate, 6);
		return `Pomodoros from ${parseDateObjToLittleEndian(firstDate)} to ${parseDateObjToLittleEndian(secondDate)} `;
	}

	function drawGraphData(graphData) {
		if (props.type === 'scatter' || props.type === 'both') drawCoordinateCrosses(graphData, GRAPH_FONT_SIZE / 3);
		if (props.type === 'line' || props.type === 'both') drawGraphLine(graphData);
	}

	function drawGraphLine(graphData) {
		drawPassedLinePath((ctx) => {
			graphData.forEach((el) => ctx.lineTo(el.coordinate.x, el.coordinate.y));
		});
	}

	function drawCoordinateCrosses(graphData, size) {
		graphData.forEach((el) => {
			const { x, y } = el.coordinate;
			drawPassedLinePath((ctx) => {
				ctx.moveTo(x - size, y - size);
				ctx.lineTo(x + size, y + size);
				ctx.moveTo(x + size, y - size);
				ctx.lineTo(x - size, y + size);
			});
		});
	}

	function drawPassedLinePath(lineFn) {
		const context = getCanvasContext();
		context.beginPath();
		lineFn(context);
		context.stroke();
	}

	function drawXAxis(graphData) {
		const context = getCanvasContext();
		graphData.forEach((el, i) => {
			const labelObj = getXAxisLabelObj(el, i);
			drawXLabelLine(labelObj);
			drawXLabelText(context, labelObj);
		});
	}

	function getXAxisLabelObj(el, i) {
		return {
			x: el.coordinate.x,
			dateText: getXAxisLabelText(el.date).reverse(),
			raisedMonthLabel: (props.period === 'month') * (i % 2)
		};
	}

	function drawXLabelLine(lineLabelObj) {
		const { x, raisedMonthLabel } = lineLabelObj;
		drawPassedLinePath((ctx) => {
			ctx.moveTo(x, canvasRef.current.height);
			ctx.lineTo(x, canvasRef.current.height - GRAPH_FONT_SIZE * (1 + raisedMonthLabel));
		});
	}

	function drawXLabelText(context, textLabelObj) {
		const { x, dateText, raisedMonthLabel } = textLabelObj;
		for (let i = 0; i < dateText.length; i++) {
			context.font = getXAxisFont();
			context.fillText(dateText[i], x, canvasRef.current.height - GRAPH_FONT_SIZE * (i + 2 + raisedMonthLabel));
		}
	}

	function drawYAxis(unit) {
		const context = getCanvasContext();
		for (let i = 0; i <= Y_AXIS_MAX; i++) {
			drawYLabelLine({ i, unit });
			drawYLabelText(context, { i, unit });
		}
	}

	function drawYLabelText(context, textLabelObj) {
		const { i, unit } = textLabelObj;
		context.font = (GRAPH_FONT_SIZE | 0) + 'px sans-serif';
		context.fillText(i, GRAPH_FONT_SIZE * 2, canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
	}

	function drawYLabelLine(lineLabelObj) {
		const { i, unit } = lineLabelObj;
		drawPassedLinePath((ctx) => {
			ctx.moveTo(0, canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
			ctx.lineTo(GRAPH_FONT_SIZE, canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
		});
	}

	function drawNoDataMessage() {
		let context = getCanvasContext();
		context.font = (GRAPH_FONT_SIZE | 0) + 'px sans-serif';
		context.fillText('No data available', canvasRef.current.width / 2, canvasRef.current.height / 2);
	}

	const canvasRef = React.useRef(null);

	useEffect(
		() => {
			canvasRef.current.width = remToPx(graphStyle.width);
			canvasRef.current.height = remToPx(graphStyle.height);
			props.entriesData.length ? addDataToGraph() : drawNoDataMessage();
		},
		[ props ]
	);

	const addDataToGraph = () => {
		const graphDataParameters = {
			startDate: props.filterOptions.date,
			period: props.period,
			entriesData: props.entriesData
		};
		const counts = getPomodoroCount(graphDataParameters);
		const units = getUnits(counts);
		const graphData = getGraphData(counts, units);
		drawGraphTitle(counts);
		drawYAxis(units.y);
		drawXAxis(graphData);
		drawGraphData(graphData);
	};

	function getUnits(counts) {
		const x = (canvasRef.current.width - GRAPH_LEFT_GAP - GRAPH_RIGHT_GAP) / (Object.values(counts).length - 1);
		const y = (canvasRef.current.height - GRAPH_TOP_GAP - GRAPH_BOTTOM_GAP) / Y_AXIS_MAX;
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

	return <canvas ref={canvasRef} style={graphStyle} />;
};

export default GraphPanel;
