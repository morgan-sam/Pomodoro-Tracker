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
	let todayIndex;
	if (graph) {
		if (graph.period === 'week ahead') todayIndex = 0;
		if (graph.period === 'week passed') todayIndex = 6;
		if (graph.period === 'month') todayIndex = graph.graphData.length - 1;
	}
	graph.graphData.forEach((el, i) => {
		console.log(todayIndex);
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
