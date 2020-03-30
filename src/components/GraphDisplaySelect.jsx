import React from 'react';
import { containerStyle, graphDisplaySelectLabelStyle, graphSelectionDropdownStyle } from 'styles/graphDisplaySelect';
import Dropdown from 'components/Dropdown';

function GraphDisplaySelect(props) {
	return (
		<div style={containerStyle}>
			<span style={graphDisplaySelectLabelStyle}>Graph Period:</span>
			<Dropdown
				style={graphSelectionDropdownStyle}
				options={[ 'none', 'week ahead', 'week passed', 'month' ]}
				default={props.displayOptions.graph.period}
				onClick={(el) =>
					props.setDisplayOptions({
						...props.displayOptions,
						graph: {
							...props.displayOptions.graph,
							period: el
						}
					})}
			/>
			<span style={graphDisplaySelectLabelStyle}>Graph Type:</span>
			<Dropdown
				style={graphSelectionDropdownStyle}
				options={[ 'scatter', 'line', 'both' ]}
				default={props.displayOptions.graph.type}
				onClick={(el) =>
					props.setDisplayOptions({
						...props.displayOptions,
						graph: {
							...props.displayOptions.graph,
							type: el
						}
					})}
			/>
		</div>
	);
}

export default GraphDisplaySelect;
