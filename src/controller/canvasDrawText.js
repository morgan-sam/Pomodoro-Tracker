import { GRAPH_SIZES } from "styles/graphSizing";
import { monthStringArray, addSubtractDaysFromDateObj } from "data/dates";
import {
  parseBigEndianToObj,
  parseDateObjToLittleEndian,
} from "utility/parseDates";
const GRAPH_FONT_SIZE = GRAPH_SIZES.FONT_SIZE;
const GRAPH_BOTTOM_GAP = GRAPH_SIZES.BOTTOM_GAP;

export const drawGraphTitle = (graph) => {
  graph.context.fillStyle = graph.darkTheme ? "white" : "black";
  graph.context.font = ((GRAPH_FONT_SIZE * 1.2) | 0) + "px sans-serif";
  graph.context.fillText(
    getGraphTitleText(graph),
    graph.canvasRef.current.width / 2,
    GRAPH_FONT_SIZE * 2
  );
};

export const drawXLabelText = (graph, textLabelObj) => {
  const { x, dateText, raisedMonthLabel } = textLabelObj;
  for (let i = 0; i < dateText.length; i++) {
    graph.context.fillStyle = graph.darkTheme ? "white" : "black";
    graph.context.font = getXAxisFont(graph.period);
    graph.context.fillText(
      dateText[i],
      x,
      graph.canvasRef.current.height -
        GRAPH_FONT_SIZE * (i + 2 + raisedMonthLabel)
    );
  }
};

export const drawYLabelText = (graph, textLabelObj) => {
  const { i, unit } = textLabelObj;
  graph.context.fillStyle = graph.darkTheme ? "white" : "black";
  graph.context.font = (GRAPH_FONT_SIZE | 0) + "px sans-serif";
  console.log(graph.context.font);
  graph.context.fillText(
    i,
    GRAPH_FONT_SIZE * 2,
    graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
  );
};

export const drawOutreachYLabelText = (graph, textLabelObj) => {
  const { i, unit } = textLabelObj;
  graph.context.fillStyle = graph.lineColors.outreach;
  graph.context.font = graph.linesEnabled.pomodoros
    ? GRAPH_FONT_SIZE / 2 + "px sans-serif"
    : GRAPH_FONT_SIZE + "px sans-serif";
  const x_offset = graph.linesEnabled.pomodoros * 15;
  graph.context.fillText(
    i,
    GRAPH_FONT_SIZE * 2 + x_offset,
    graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
  );
};

export const drawApplicationsYLabelText = (graph, textLabelObj) => {
  const { i, unit } = textLabelObj;
  graph.context.fillStyle = graph.lineColors.applications;
  graph.context.font =
    graph.linesEnabled.pomodoros || graph.linesEnabled.outreach
      ? GRAPH_FONT_SIZE / 2 + "px sans-serif"
      : GRAPH_FONT_SIZE + "px sans-serif";
  console.log(graph.context.font);
  const x_offset =
    graph.linesEnabled.pomodoros * 15 + graph.linesEnabled.outreach * 15;
  graph.context.fillText(
    i,
    GRAPH_FONT_SIZE * 2 + x_offset,
    graph.canvasRef.current.height - GRAPH_BOTTOM_GAP - i * unit
  );
};

function getXAxisFont(period) {
  if (period.match(/week/))
    return ((GRAPH_FONT_SIZE / 1.2) | 0) + "px sans-serif";
  if (period === "month")
    return ((GRAPH_FONT_SIZE / 1.5) | 0) + "px sans-serif";
}

function getGraphTitleText(graph) {
  const dateObj = parseBigEndianToObj(Object.keys(graph.counts)[0]);
  if (graph.period.match(/week/)) return getWeekGraphTitleRange(dateObj);
  if (graph.period === "month")
    return `Pomodoros in ${monthStringArray[parseInt(dateObj.month) - 1]} ${
      dateObj.year
    }`;
}

function getWeekGraphTitleRange(firstDate) {
  const secondDate = addSubtractDaysFromDateObj(firstDate, 6);
  return `Pomodoros from ${parseDateObjToLittleEndian(
    firstDate
  )} to ${parseDateObjToLittleEndian(secondDate)} `;
}
