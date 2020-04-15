import { GRAPH_SIZES } from 'styles/graphSizing';
import { monthStringArray, addSubtractDaysFromDateObj } from 'data/dates';
import { parseBigEndianToObj, parseDateObjToLittleEndian } from 'utility/parseDates';
const GRAPH_FONT_SIZE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;

export const drawGraphTitle = (graph) => {
	graph.context.font = ((GRAPH_FONT_SIZE * 1.2) | 0) + 'px sans-serif';
	graph.context.fillText(getGraphTitleText(graph), graph.canvasRef.current.width / 2, GRAPH_FONT_SIZE * 2);
};

export const drawXLabelText = (graph, textLabelObj) => {
	const { x, dateText, raisedMonthLabel } = textLabelObj;
	for (let i = 0; i < dateText.length; i++) {
		graph.context.font = getXAxisFont(graph.period);
		graph.context.fillText(
			dateText[i],
			x,
			graph.canvasRef.current.height - GRAPH_FONT_SIZE * (i + 2 + raisedMonthLabel)
		);
	}
};

export const drawYLabelText = (graph, textLabelObj) => {
	const { i, unit } = textLabelObj;
	graph.context.font = (GRAPH_FONT_SIZE | 0) + 'px sans-serif';
	graph.context.fillText(i, GRAPH_FONT_SIZE * 2, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
};

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
	const secondDate = addSubtractDaysFromDateObj(firstDate, 6);
	return `Pomodoros from ${parseDateObjToLittleEndian(firstDate)} to ${parseDateObjToLittleEndian(secondDate)} `;
}
