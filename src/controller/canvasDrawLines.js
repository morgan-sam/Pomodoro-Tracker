import { GRAPH_SIZES } from 'styles/graphSizing';
import { parseISOToBigEndian } from 'utility/parseDates';
const GRAPH_SCALE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;
let CROSS_WIDTH = 3;

export const drawGraphLine = (graph) => {
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.strokeStyle = graph.darkTheme ? 'white' : 'black';
		graph.graphData.forEach((el) => ctx.lineTo(el.coordinate.x, el.coordinate.y));
	});
};

export const drawCoordinateCrosses = (graph, size) => {
	const today = parseISOToBigEndian(new Date().toISOString());
	graph.graphData.forEach((el, i) => {
		let { x, y } = el.coordinate;
		const crossColor = today === el.date ? graph.colorTheme.darker : graph.darkTheme ? 'white' : 'black';
		drawPassedLinePath(graph.context, (ctx) => {
			ctx.strokeStyle = crossColor;
			ctx.beginPath();
			x -= size;
			y -= size;
			ctx.moveTo(x, y);
			for (let i = 0; i < 4; i++) {
				ctx.lineTo((x += CROSS_WIDTH / 2 * crossMod(i)), (y += CROSS_WIDTH / 2 * crossMod(i, 3)));
				ctx.lineTo((x += size * crossMod(i, 3) * -1), (y += size * crossMod(i)));
				ctx.lineTo((x += size * crossMod(i)), (y += size * crossMod(i, 3)));
			}
			ctx.stroke();
			ctx.closePath();
			ctx.fillStyle = crossColor;
			ctx.fill();
		});
	});
};

const crossMod = (index, offset = 0) => {
	return Math.floor(((index + offset) % 4) / 2) * -2 + 1;
};

export const drawXLabelLine = (graph, lineLabelObj) => {
	const { x, raisedMonthLabel } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.strokeStyle = graph.darkTheme ? 'white' : 'black';
		ctx.moveTo(x, graph.canvasRef.current.height);
		ctx.lineTo(x, graph.canvasRef.current.height - GRAPH_SCALE * (1 + raisedMonthLabel));
	});
};

export const drawYLabelLine = (graph, lineLabelObj) => {
	const { i, unit } = lineLabelObj;
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.strokeStyle = graph.darkTheme ? 'white' : 'black';
		ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
		ctx.lineTo(GRAPH_SCALE, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
	});
};

function drawPassedLinePath(context, lineFn) {
	context.beginPath();
	lineFn(context);
	context.stroke();
}
