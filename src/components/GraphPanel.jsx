import React from 'react';
import GraphCanvas from 'components/GraphCanvas';

function GraphPanel(props) {
	return (
		<div className={'canvasContainer'} style={props.style}>
			<GraphCanvas
				entriesData={props.entriesData}
				filterOptions={props.filterOptions}
				displayOptions={props.displayOptions}
				{...props.displayOptions.graph}
			/>
		</div>
	);
}

export default GraphPanel;