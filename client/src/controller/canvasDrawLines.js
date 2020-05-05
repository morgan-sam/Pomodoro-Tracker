import { GRAPH_SIZES } from 'styles/graphSizing';
import { parseISOToBigEndian } from 'utility/parseDates';
const GRAPH_SCALE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;
let CROSS_WIDTH = 3;

export const drawGraphLine = (graph) => {
	drawPassedLinePath(graph.context, (ctx) => {
		ctx.strokeStyle = '#000000';
		graph.graphData.forEach((el) => ctx.lineTo(el.coordinate.x, el.coordinate.y));
	});
};

export const drawCoordinateCrosses = (graph, size) => {
	const today = parseISOToBigEndian(new Date().toISOString());
	graph.graphData.forEach((el, i) => {
		let { x, y } = el.coordinate;
		const crossColor = today === el.date ? '#FF0000' : '#000000';
		drawPassedLinePath(graph.context, (ctx) => {
			ctx.strokeStyle = crossColor;
			ctx.beginPath();
			x -= size;
			y -= size;
			ctx.moveTo(x, y);
			for (let i = 0; i < 4; i++) {
				const widthX = Math.floor((i % 4) / 2) * -2 + 1;
				const widthY = Math.floor(((i + 3) % 4) / 2) * -2 + 1;
				const sizeX = widthY * -1;
				const sizeY = widthX;
				x += CROSS_WIDTH / 2 * widthX;
				y += CROSS_WIDTH / 2 * widthY;
				ctx.lineTo(x, y);
				x += size * sizeX;
				y += size * sizeY;
				ctx.lineTo(x, y);
				x += size * widthX;
				y += size * widthY;
				ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.closePath();
			ctx.fillStyle = crossColor;
			ctx.fill();
		});
	});
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
