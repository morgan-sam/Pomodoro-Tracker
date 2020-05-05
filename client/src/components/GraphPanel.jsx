import React from 'react';
import GraphCanvas from 'components/GraphCanvas';

function GraphPanel(props) {
	console.log(props);
	return (
		<div style={props.style}>
			{props.displayOptions.graph.visible && (
				<GraphCanvas
					entriesData={props.entriesData}
					filterOptions={props.filterOptions}
					{...props.displayOptions.graph}
				/>
			)}
		</div>
	);
}

export default GraphPanel;
