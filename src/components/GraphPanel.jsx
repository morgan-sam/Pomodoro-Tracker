import React from 'react';
import GraphCanvas from 'components/GraphCanvas';
import { getSystemButtonStyle } from 'styles/settings';

function GraphPanel(props) {
	const darkTheme = props.options.darkTheme;
	return (
		<div className={'canvas-container'} style={props.style}>
			<div className={'switch-graph-view-btn'} style={getSystemButtonStyle(darkTheme)}>
				Switch View
			</div>
			<GraphCanvas
				entriesData={props.entriesData}
				date={props.date}
				options={props.options}
				{...props.options.graph}
			/>
		</div>
	);
}

export default GraphPanel;
