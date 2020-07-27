import React from 'react';
import GraphPanel from 'components/GraphPanel';

function BottomPanel(props) {
	return (
		<div className={'bottom-panel-container'}>
			<GraphPanel entriesData={props.entriesData} date={props.date} options={props.options} />
		</div>
	);
}

export default BottomPanel;
