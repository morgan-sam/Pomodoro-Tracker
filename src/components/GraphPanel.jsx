import React from 'react';
import GraphCanvas from 'components/GraphCanvas';

function GraphPanel(props) {
	return (
		<div className={'canvasContainer'} style={props.style}>
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
