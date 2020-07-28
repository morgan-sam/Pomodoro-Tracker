import React, { useState } from 'react';
import GraphCanvas from 'components/GraphCanvas';
import { getSystemButtonStyle } from 'styles/settings';
import { graphPeriodOptions } from 'data/defaultState';

function GraphPanel(props) {
	const [ periodOffset, setPeriodOffset ] = useState(0);
	const darkTheme = props.options.darkTheme;

	const getNewPeriod = () => {
		const index = graphPeriodOptions.findIndex((el) => el === props.options.graph.period);
		return graphPeriodOptions[(index + periodOffset) % graphPeriodOptions.length];
	};

	return (
		<div className={'canvas-container'} style={props.style}>
			<div
				className={'switch-graph-view-btn'}
				style={getSystemButtonStyle(darkTheme)}
				onClick={() => setPeriodOffset((periodOffset + 1) % graphPeriodOptions.length)}
			>
				Switch View
			</div>
			<GraphCanvas
				entriesData={props.entriesData}
				date={props.date}
				options={props.options}
				{...props.options.graph}
				period={getNewPeriod()}
			/>
		</div>
	);
}

export default GraphPanel;
