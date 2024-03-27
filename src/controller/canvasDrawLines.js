import { GRAPH_SIZES } from "styles/graphSizing";

const GRAPH_SCALE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;
let CROSS_WIDTH = 3;

export const drawGraphLine = (graph) => {
  // Draw Applications Line
  if (graph.linesEnabled.applications) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.lineColors.applications;
      graph.applicationsGraphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x, el.coordinate.y)
      );
    });
  }

  // Draw Outreach Line
  if (graph.linesEnabled.outreach) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.lineColors.outreach;
      graph.outreachGraphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x, el.coordinate.y)
      );
    });
  }

  // Draw Pomodoro Line
  if (graph.linesEnabled.pomodoros) {
    drawPassedLinePath(graph.context, (ctx) => {
      ctx.strokeStyle = graph.lineColors.pomodoros;
      graph.graphData.forEach((el) =>
        ctx.lineTo(el.coordinate.x, el.coordinate.y)
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
    ctx.lineTo(x + size * 2, y + size * 2);
    ctx.moveTo(x + size * 2, y);
    ctx.lineTo(x, y + size * 2);

    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = crossColor;
    ctx.fill();
  });
};

export const drawPlus = (graph, size, el, crossColor) => {
  let { x, y } = el.coordinate;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = crossColor;
    ctx.beginPath();

    ctx.moveTo(x, y - size * 1.5);
    ctx.lineTo(x, y + size * 1.5);
    ctx.moveTo(x - size * 1.5, y);
    ctx.lineTo(x + size * 1.5, y);

    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = crossColor;
    ctx.fill();
  });
};

// Draw Circle Sign
export const drawCircle = (graph, size, el, crossColor) => {
  let { x, y } = el.coordinate;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = crossColor;
    ctx.beginPath();

    // Draw an outline of a circle
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    // make it thicker
    ctx.lineWidth = 2;

    ctx.stroke();
    ctx.closePath();
    // fill with canvas background color
    ctx.fillStyle = "white";
    ctx.fill();
  });
};

export const drawCoordinateCrosses = (graph, size) => {
  // Draw Outreach Crosses
  if (graph.linesEnabled.outreach) {
    graph.outreachGraphData.forEach((el) => {
      drawCircle(
        graph,
        size,
        {
          ...el,
          coordinate: {
            x: el.coordinate.x,
            y: el.coordinate.y,
          },
        },
        graph.lineColors.outreach
      );
    });
  }
  // Draw Applications Crosses
  if (graph.linesEnabled.applications) {
    graph.applicationsGraphData.forEach((el) => {
      drawPlus(
        graph,
        size,
        {
          ...el,
          coordinate: {
            x: el.coordinate.x,
            y: el.coordinate.y,
          },
        },
        graph.lineColors.applications
      );
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
      drawCross(
        graph,
        size,
        {
          ...el,
          coordinate: {
            x: el.coordinate.x,
            y: el.coordinate.y,
          },
        },
        graph.lineColors.pomodoros
      );
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
    ctx.strokeStyle = graph.lineColors.outreach;
    ctx.moveTo(0, graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit);
    ctx.lineTo(
      GRAPH_SCALE - 5,
      graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
    );
  });
};

export const drawApplicationsYLabelLine = (graph, lineLabelObj) => {
  const { i, unit } = lineLabelObj;
  drawPassedLinePath(graph.context, (ctx) => {
    ctx.strokeStyle = graph.lineColors.applications;
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
