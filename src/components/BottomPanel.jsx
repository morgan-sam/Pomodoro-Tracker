import React from 'react';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';

function BottomPanel(props) {
	return (
		<div className={'bottom-panel-container'}>
			<GraphPanel entriesData={props.entriesData} date={props.date} options={props.options} />
			<OptionsPanel {...props} className={'bottom-panel-options-panel'} />
		</div>
	);
}

export default BottomPanel;
