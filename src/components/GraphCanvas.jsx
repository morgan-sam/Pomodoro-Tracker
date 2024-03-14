import React, { useEffect, useRef, useContext } from "react";
import {
  getPomodoroCount,
  getTallyCount,
} from "controller/graphDataProcessing";
import { getGraphStyle } from "styles/graphPanel";
import { GRAPH_SIZES } from "styles/graphSizing";
import { drawNoDataMessage, drawEntireGraph } from "controller/canvasDrawing";
import { ColorThemeContext } from "context/theme";

const GraphPanel = (props) => {
  const { options, entriesData, outreachData, applicationsData, lineColors } =
    props;
  const { period, type, maxPomodoro, linesEnabled } = options.graph;
  const Y_AXIS_MAX = maxPomodoro;

  const colorTheme = useContext(ColorThemeContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current.width = 1000;
    canvasRef.current.height = 500;
    props.entriesData.length
      ? addDataToGraph(canvasRef, options.darkTheme)
      : drawNoDataMessage(canvasRef, options.darkTheme);
  }, [props]);

  const addDataToGraph = (canvasRef, darkTheme) => {
    const entriesParameters = {
      startDate: props.date,
      period: props.period,
    };

    const outreachRatio = 2;
    const applicationsRatio = 2;

    const counts = getPomodoroCount(entriesParameters, entriesData);
    const outreachCounts = getTallyCount(entriesParameters, outreachData);
    const applicationsCounts = getTallyCount(
      entriesParameters,
      applicationsData
    );

    const units = getUnits(counts);
    const outreachUnits = getOutreachUnits(units, outreachRatio);
    const applicationsUnits = getOutreachUnits(units, applicationsRatio);

    const graphData = getGraphData(counts, units);
    const outreachGraphData = getGraphData(outreachCounts, outreachUnits);
    const applicationsGraphData = getGraphData(
      applicationsCounts,
      applicationsUnits
    );

    const graphDataObj = {
      canvasRef,
      graphData,
      outreachGraphData,
      applicationsGraphData,
      counts,
      period,
      type,
      units,
      yAxisMax: Y_AXIS_MAX,
      darkTheme,
      colorTheme,
      outreachRatio,
      lineColors,
      linesEnabled,
    };
    drawEntireGraph(graphDataObj);
  };

  function getUnits(counts) {
    const x =
      (canvasRef.current.width - GRAPH_SIZES.LEFT_GAP - GRAPH_SIZES.RIGHT_GAP) /
      (Object.values(counts).length - 1);
    const y =
      (canvasRef.current.height -
        GRAPH_SIZES.TOP_GAP -
        GRAPH_SIZES.BOTTOM_GAP) /
      Y_AXIS_MAX;
    return { x, y };
  }

  function getOutreachUnits(units, outreachRatio) {
    const { x, y } = units;
    return { x, y: y / outreachRatio };
  }

  function getGraphData(counts, units) {
    return Object.entries(counts).map((el, i) => {
      return {
        date: el[0],
        coordinate: {
          x: GRAPH_SIZES.LEFT_GAP + units.x * i,
          y:
            canvasRef.current.height - GRAPH_SIZES.BOTTOM_GAP - units.y * el[1],
        },
      };
    });
  }

  return (
    <canvas
      className="count-line-graph"
      ref={canvasRef}
      style={getGraphStyle(options.darkTheme)}
    />
  );
};

export default GraphPanel;
