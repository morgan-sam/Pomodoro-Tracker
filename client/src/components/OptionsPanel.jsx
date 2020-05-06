import React from 'react';
import GraphDisplaySelect from 'components/GraphDisplaySelect';
import { optionsContainerStyle, optionsPanelItem } from 'styles/optionsPanel';

function OptionsPanel(props) {
	return (
		<div style={props.style}>
			<div className="optionsContainer" style={optionsContainerStyle}>
				<GraphDisplaySelect
					setDisplayOptions={props.setDisplayOptions}
					displayOptions={props.displayOptions}
					style={optionsPanelItem}
				/>
			</div>
		</div>
	);
}

export default OptionsPanel;
