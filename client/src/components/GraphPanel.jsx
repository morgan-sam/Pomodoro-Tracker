import React, { useEffect } from 'react';
import { remToPx } from 'utility/convertUnit';
import { getPomodoroCount } from 'controller/graphDataProcessing';
import { graphStyle } from 'styles/graphPanel';
import { GRAPH_SIZES } from 'styles/graphSizing';
import { drawNoDataMessage, drawEntireGraph } from 'controller/canvasDrawing';

const GraphPanel = (props) => {
	const Y_AXIS_MAX = props.maxPomodoro;
	const canvasRef = React.useRef(null);

	useEffect(
		() => {
			canvasRef.current.width = remToPx(graphStyle.width);
			canvasRef.current.height = remToPx(graphStyle.height);
			props.entriesData.length ? addDataToGraph() : drawNoDataMessage(canvasRef);
		},
		[ props ]
	);

	const addDataToGraph = () => {
		const entriesParameters = {
			startDate: props.filterOptions.date,
			period: props.period,
			entriesData: props.entriesData
		};
		const counts = getPomodoroCount(entriesParameters);
		const units = getUnits(counts);
		const graphData = getGraphData(counts, units);
		const graphDataObj = {
			canvasRef,
			graphData,
			counts,
			period: props.period,
			type: props.type,
			units,
			yAxisMax: Y_AXIS_MAX
		};
		drawEntireGraph(graphDataObj);
	};

	function getUnits(counts) {
		const x =
			(canvasRef.current.width - GRAPH_SIZES.LEFT_GAP - GRAPH_SIZES.RIGHT_GAP) /
			(Object.values(counts).length - 1);
		const y = (canvasRef.current.height - GRAPH_SIZES.TOP_GAP - GRAPH_SIZES.BOTTOM_GAP) / Y_AXIS_MAX;
		return { x, y };
	}

	function getGraphData(counts, units) {
		return Object.entries(counts).map((el, i) => {
			return {
				date: el[0],
				coordinate: {
					x: GRAPH_SIZES.LEFT_GAP + units.x * i,
					y: canvasRef.current.height - GRAPH_SIZES.BOTTOM_GAP - units.y * el[1]
				}
			};
		});
	}

	return <canvas ref={canvasRef} style={graphStyle} />;
};

export default GraphPanel;
