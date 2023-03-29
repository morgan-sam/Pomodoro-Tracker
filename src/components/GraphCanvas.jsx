import React, { useEffect, useRef, useContext } from "react";
import { getPomodoroCount, getOutreachCount } from "controller/graphDataProcessing";
import { getGraphStyle } from "styles/graphPanel";
import { GRAPH_SIZES } from "styles/graphSizing";
import { drawNoDataMessage, drawEntireGraph } from "controller/canvasDrawing";
import { ColorThemeContext } from "context/theme";

const GraphPanel = (props) => {
  const { entriesData, outreachData } = props;
  const colorTheme = useContext(ColorThemeContext);
  const { options } = props;
  const Y_AXIS_MAX = props.maxPomodoro;
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current.width = 920;
    canvasRef.current.height = 440;
    props.entriesData.length
      ? addDataToGraph(canvasRef, options.darkTheme)
      : drawNoDataMessage(canvasRef, options.darkTheme);
  }, [props]);

  const addDataToGraph = (canvasRef, darkTheme) => {
    const entriesParameters = {
      startDate: props.date,
      period: props.period
    };

    const outreachRatio = 2;
    const outreachPlotColor = "#b55c4e";

    const counts = getPomodoroCount(entriesParameters, entriesData);
    const outreachCounts = getOutreachCount(entriesParameters, outreachData);
    const units = getUnits(counts);
    const outreachUnits = getOutreachUnits(units, outreachRatio);
    const graphData = getGraphData(counts, units);
    const outreachGraphData = getGraphData(outreachCounts, outreachUnits);
    const graphDataObj = {
      canvasRef,
      graphData,
      outreachGraphData,
      counts,
      period: props.period,
      type: props.type,
      units,
      yAxisMax: Y_AXIS_MAX,
      darkTheme,
      colorTheme,
      outreachRatio,
      outreachPlotColor,
      linesEnabled: props.options.graph.linesEnabled
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

  return <canvas className="count-line-graph" ref={canvasRef} style={getGraphStyle(options.darkTheme)} />;
};

export default GraphPanel;
