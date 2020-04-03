import { monthStringArray, addOrSubtractDaysFromDateObj } from 'data/dates';
import { parseBigEndianToObj, parseDateObjToLittleEndian } from 'utility/parseDates';
import { GRAPH_SIZES } from 'styles/graphSizing';
const GRAPH_FONT_SIZE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;

function getCanvasContext(canvasRef) {
	const context = canvasRef.current.getContext('2d');
	context.textBaseline = 'middle';
	context.textAlign = 'center';
	return context;
}

export const drawNoDataMessage = (canvasRef) => {
	const context = getCanvasContext(canvasRef);
	context.font = (GRAPH_FONT_SIZE | 0) + 'px sans-serif';
	context.fillText('No data available', canvasRef.current.width / 2, canvasRef.current.height / 2);
};

export const drawEntireGraph = (graphDataObj) => {
	const graph = { ...graphDataObj, context: getCanvasContext(graphDataObj.canvasRef) };
	drawGraphTitle(graph);
	drawXAxis(graph);
	drawYAxis(graph);
	drawGraphPlot(graph);
};

/////////////////// MAIN DRAW FUNCTIONS /////////////////

const drawGraphTitle = (graph) => {
	graph.context.font = ((GRAPH_FONT_SIZE * 1.2) | 0) + 'px sans-serif';
	graph.context.fillText(getGraphTitleText(graph), graph.canvasRef.current.width / 2, GRAPH_FONT_SIZE * 2);
};

const drawXAxis = (graph) => {
	graph.graphData.forEach((el, i) => {
		const labelObj = getXAxisLabelObj(el, i, graph.period);
		drawXLabelLine(graph, labelObj);
		drawXLabelText(graph, labelObj);
	});
};

const drawYAxis = (graph) => {
	for (let i = 0; i <= graph.yAxisMax; i++) {
		drawYLabelLine(graph, { i, unit: graph.unit });
		drawYLabelText(graph, { i, unit: graph.unit });
	}
};

const drawGraphPlot = (graph) => {
	if (graph.type === 'scatter' || graph.type === 'both') drawCoordinateCrosses(graph, GRAPH_FONT_SIZE / 3);
	if (graph.type === 'line' || graph.type === 'both') drawGraphLine(graph);
};

//////////////////////////////////////

function getXAxisLabelText(period, date) {
	const dateObj = parseBigEndianToObj(date);
	const shortDayString = new Date(`${date}T00:00:00.000Z`).toString().substring(0, 3);
	if (period.match(/week/)) return [ shortDayString, `${dateObj.day}/${dateObj.month}` ];
	if (period === 'month') return [ `${parseInt(dateObj.day)}` ];
}

function getXAxisFont(period) {
	if (period.match(/week/)) return ((GRAPH_FONT_SIZE / 1.2) | 0) + 'px sans-serif';
	if (period === 'month') return ((GRAPH_FONT_SIZE / 1.5) | 0) + 'px sans-serif';
}

function getGraphTitleText(graph) {
	const dateObj = parseBigEndianToObj(Object.keys(graph.counts)[0]);
	if (graph.period.match(/week/)) return getWeekGraphTitleRange(dateObj);
	if (graph.period === 'month')
		return `Pomodoros in ${monthStringArray[parseInt(dateObj.month) - 1]} ${dateObj.year}`;
}

function getWeekGraphTitleRange(firstDate) {
	const secondDate = addOrSubtractDaysFromDateObj(firstDate, 6);
	return `Pomodoros from ${parseDateObjToLittleEndian(firstDate)} to ${parseDateObjToLittleEndian(secondDate)} `;
}

function drawGraphLine(graph) {
	drawPassedLinePath(graph.context, (ctx) => {
		graph.graphData.forEach((el) => ctx.lineTo(el.coordinate.x, el.coordinate.y));
	});
}

function drawCoordinateCrosses(graph, size) {
	graph.graphData.forEach((el) => {
		const { x, y } = el.coordinate;
		drawPassedLinePath(graph.context, (ctx) => {
			ctx.moveTo(x - size, y - size);
			ctx.lineTo(x + size, y + size);
			ctx.moveTo(x + size, y - size);
			ctx.lineTo(x - size, y + size);
		});
	});
}

function drawPassedLinePath(context, lineFn) {
	context.beginPath();
	lineFn(context);
	context.stroke();
}

function getXAxisLabelObj(el, i, period) {
	return {
		x: el.coordinate.x,
		dateText: getXAxisLabelText(period, el.date).reverse(),
		raisedMonthLabel: (period === 'month') * (i % 2)
	};
}

function drawXLabelLine(graph, lineLabelObj) {
	const { x, raisedMonthLabel } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.moveTo(x, graph.canvasRef.current.height);
		ctx.lineTo(x, graph.canvasRef.current.height - GRAPH_FONT_SIZE * (1 + raisedMonthLabel));
	});
}

function drawXLabelText(graph, textLabelObj) {
	const { x, dateText, raisedMonthLabel } = textLabelObj;
	for (let i = 0; i < dateText.length; i++) {
		graph.context.font = getXAxisFont(graph.period);
		graph.context.fillText(
			dateText[i],
			x,
			graph.canvasRef.current.height - GRAPH_FONT_SIZE * (i + 2 + raisedMonthLabel)
		);
	}
}

function drawYLabelText(graph, textLabelObj) {
	const { i, unit } = textLabelObj;
	graph.context.font = (GRAPH_FONT_SIZE | 0) + 'px sans-serif';
	graph.context.fillText(i, GRAPH_FONT_SIZE * 2, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
}

function drawYLabelLine(graph, lineLabelObj) {
	const { i, unit } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
		ctx.lineTo(GRAPH_FONT_SIZE, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
	});
}
