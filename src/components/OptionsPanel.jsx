import React from 'react';
import GraphDisplaySelect from 'components/GraphDisplaySelect';

function OptionsPanel(props) {
	return (
		<div style={props.style} className={props.className}>
			<div className="options-panel">
				<GraphDisplaySelect setOptions={props.setOptions} options={props.options} />
			</div>
		</div>
	);
}

export default OptionsPanel;
