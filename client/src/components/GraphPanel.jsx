import React from 'react';
import GraphCanvas from 'components/GraphCanvas';

function GraphPanel(props) {
	return (
		<div style={props.style}>
			{props.displayOptions.graph.period !== 'none' ? (
				<GraphCanvas
					entriesData={props.entriesData}
					filterOptions={props.filterOptions}
					{...props.displayOptions.graph}
				/>
			) : null}
		</div>
	);
}

export default GraphPanel;
