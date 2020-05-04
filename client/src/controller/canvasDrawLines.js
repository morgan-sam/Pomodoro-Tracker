import { GRAPH_SIZES } from 'styles/graphSizing';
const GRAPH_SCALE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;

export const drawGraphLine = (graph) => {
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.strokeStyle = '#000000';
		graph.graphData.forEach((el) => ctx.lineTo(el.coordinate.x, el.coordinate.y));
	});
};

export const drawCoordinateCrosses = (graph, size) => {
	const todayIndex = getTodayIndex(graph);
	graph.graphData.forEach((el, i) => {
		const { x, y } = el.coordinate;
		drawPassedLinePath(graph.context, (ctx) => {
			ctx.strokeStyle = todayIndex === i ? '#FF0000' : '#000000';
			ctx.moveTo(x - size, y - size);
			ctx.lineTo(x + size, y + size);
			ctx.moveTo(x + size, y - size);
			ctx.lineTo(x - size, y + size);
		});
	}, todayIndex);
};

const getTodayIndex = (graph) => {
	const { period, graphData } = graph;
	if (period === 'week ahead') return 0;
	else if (period === 'week passed') return 6;
	else if (period === 'month') return graphData.length - 1;
	else return null;
};

export const drawXLabelLine = (graph, lineLabelObj) => {
	const { x, raisedMonthLabel } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.moveTo(x, graph.canvasRef.current.height);
		ctx.lineTo(x, graph.canvasRef.current.height - GRAPH_SCALE * (1 + raisedMonthLabel));
	});
};

export const drawYLabelLine = (graph, lineLabelObj) => {
	const { i, unit } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
		ctx.lineTo(GRAPH_SCALE, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
	});
};

function drawPassedLinePath(context, lineFn) {
	context.beginPath();
	lineFn(context);
	context.stroke();
}
