import React from 'react';
import GraphCanvas from 'components/GraphCanvas';

function GraphPanel(props) {
	return (
		<div style={props.style}>
			<GraphCanvas
				entriesData={props.entriesData}
				filterOptions={props.filterOptions}
				{...props.displayOptions.graph}
			/>
		</div>
	);
}

export default GraphPanel;
