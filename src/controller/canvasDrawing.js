import {
  drawGraphTitle,
  drawXLabelText,
  drawYLabelText,
  drawOutreachYLabelText
} from "controller/canvasDrawText";
import {
  drawGraphLine,
  drawCoordinateCrosses,
  drawXLabelLine,
  drawYLabelLine,
  drawOutreachYLabelLine,
} from "controller/canvasDrawLines";
import {
  getXAxisLabelObj
} from "controller/graphAxisLabels";
import {
  GRAPH_SIZES
} from "styles/graphSizing";
const GRAPH_FONT_SIZE = GRAPH_SIZES.FONT_SIZE;

const getCanvasContext = (canvasRef) => {
  const context = canvasRef.current.getContext("2d");
  context.textBaseline = "middle";
  context.textAlign = "center";
  return context;
};

export const drawNoDataMessage = (canvasRef, darkTheme) => {
  const context = getCanvasContext(canvasRef);
  context.font = (GRAPH_FONT_SIZE | 0) + "px sans-serif";
  context.fillStyle = darkTheme ? "white" : "black";
  context.fillText(
    "No data available",
    canvasRef.current.width / 2,
    canvasRef.current.height / 2
  );
};

export const drawEntireGraph = (graphDataObj) => {
  const graph = {
    ...graphDataObj,
    context: getCanvasContext(graphDataObj.canvasRef),
  };
  drawGraphTitle(graph);
  drawXAxis(graph);
  drawYAxis(graph);
  drawGraphPlot(graph);
};

const drawXAxis = (graph) => {
  graph.graphData.forEach((el, index) => {
    const labelParameters = {
      index,
      period: graph.period,
      position: el.coordinate.x,
      date: el.date,
    };
    const labelObj = getXAxisLabelObj(labelParameters);
    drawXLabelLine(graph, labelObj);
    drawXLabelText(graph, labelObj);
  });
};

const drawYAxis = (graph) => {

  // Draw Outreach Y Axis
  if (graph.linesEnabled.outreach) {
    for (let i = 0; i <= graph.yAxisMax * graph.outreachRatio; i++) {
      const labelParameters = {
        i,
        unit: graph.units.y / graph.outreachRatio
      };
      drawOutreachYLabelLine(graph, labelParameters);
      if (i % 2 === 0) drawOutreachYLabelText(graph, labelParameters);
    }
  }

  // Draw Podomoros Y Axis
  if (graph.linesEnabled.pomodoros) {
    for (let i = 0; i <= graph.yAxisMax; i++) {
      const labelParameters = {
        i,
        unit: graph.units.y
      };
      drawYLabelLine(graph, labelParameters);
      drawYLabelText(graph, labelParameters);
    }
  }
};

const drawGraphPlot = (graph) => {
  if (graph.type === "line" || graph.type === "both") drawGraphLine(graph);
  if (graph.type === "scatter" || graph.type === "both")
    drawCoordinateCrosses(graph, GRAPH_FONT_SIZE / 3);
};