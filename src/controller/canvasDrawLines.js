import { GRAPH_SIZES } from "styles/graphSizing";
import { parseISOToBigEndian } from "utility/parseDates";
const GRAPH_SCALE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;
let CROSS_WIDTH = 3;

export const drawGraphLine = (graph) => {
  // Draw Applications Line
  if (graph.linesEnabled.applications) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.applicationsPlotColor;
      graph.applicationsGraphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x +10, el.coordinate.y)
      );
    });
  }

  // Draw Outreach Line
  if (graph.linesEnabled.outreach) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.outreachPlotColor;
      graph.outreachGraphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x, el.coordinate.y)
      );
    });
  }

  // Draw Pomodoro Line
  if (graph.linesEnabled.pomodoros) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.darkTheme ? "white" : "black";
      graph.graphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x -10, el.coordinate.y)
      );
    });
  }
};

const drawCross = (graph, size, el, crossColor) => {
  let { x, y } = el.coordinate;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = crossColor;
    ctx.beginPath();
    x -= size;
    y -= size;
    ctx.moveTo(x, y);
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(
        (x += (CROSS_WIDTH / 2) * crossMod(i)),
        (y += (CROSS_WIDTH / 2) * crossMod(i, 3))
      );
      ctx.lineTo((x += size * crossMod(i, 3) * -1), (y += size * crossMod(i)));
      ctx.lineTo((x += size * crossMod(i)), (y += size * crossMod(i, 3)));
    }
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = crossColor;
    ctx.fill();
  });
};

export const drawCoordinateCrosses = (graph, size) => {
  const today = parseISOToBigEndian(new Date().toISOString());

  // Draw Applications Crosses
  if (graph.linesEnabled.applications) {
    graph.applicationsGraphData.forEach((el) => {
      drawCross(graph, size, { ...el,coordinate: {
        x: el.coordinate.x + 10,
        y: el.coordinate.y      
      }}, graph.applicationsPlotColor);
    });
  }
  // Draw Outreach Crosses
  if (graph.linesEnabled.outreach) {
    graph.outreachGraphData.forEach((el) => {
      drawCross(graph, size, { ...el,coordinate: {
        x: el.coordinate.x + 0,
        y: el.coordinate.y      
      }}, graph.outreachPlotColor);
    });
  }
  // Draw Pomodoros Crosses
  if (graph.linesEnabled.pomodoros) {
    graph.graphData.forEach((el) => {
      // const crossColor =
      //   today === el.date
      //     ? graph.colorTheme.darker
      //     : graph.darkTheme
      //     ? "white"
      //     : "black";
      const crossColor = graph.darkTheme ? "white" : "black";
      drawCross(graph, size, { ...el,coordinate: {
        x: el.coordinate.x - 10,
        y: el.coordinate.y      
      }}, crossColor);
    });
  }
};

const crossMod = (index, offset = 0) => {
  return Math.floor(((index + offset) % 4) / 2) * -2 + 1;
};

export const drawXLabelLine = (graph, lineLabelObj) => {
  const { x, raisedMonthLabel } = lineLabelObj;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = graph.darkTheme ? "white" : "black";
    ctx.moveTo(x, graph.canvasRef.current.height);
    ctx.lineTo(
      x,
      graph.canvasRef.current.height - GRAPH_SCALE * (1 + raisedMonthLabel)
    );
  });
};

export const drawYLabelLine = (graph, lineLabelObj) => {
  const { i, unit } = lineLabelObj;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = graph.darkTheme ? "white" : "black";
    ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
    ctx.lineTo(
      GRAPH_SCALE,
      graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
    );
  });
};

export const drawOutreachYLabelLine = (graph, lineLabelObj) => {
  const { i, unit } = lineLabelObj;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = graph.outreachPlotColor;
    ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
    ctx.lineTo(
      GRAPH_SCALE - 5,
      graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
    );
  });
};

function drawPassedLinePath(context, lineFn) {
  context.beginPath();
  lineFn(context);
  context.stroke();
}
