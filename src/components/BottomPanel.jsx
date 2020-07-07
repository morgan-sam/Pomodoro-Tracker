import React from 'react';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';
import { panelContainerStyle, optionsPanelStyle } from 'styles/bottomPanel';

function BottomPanel(props) {
	return (
		<div style={panelContainerStyle}>
			<GraphPanel
				entriesData={props.entriesData}
				filterOptions={props.filterOptions}
				displayOptions={props.displayOptions}
			/>
			<OptionsPanel {...props} style={optionsPanelStyle} />
		</div>
	);
}

export default BottomPanel;
