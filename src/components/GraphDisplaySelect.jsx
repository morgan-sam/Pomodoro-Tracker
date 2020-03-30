import React from 'react';
import {
	containerStyle,
	toggleButtonStyle,
	timelineDisplaySelectLabelStyle,
	graphSelectionDropdownStyle
} from 'styles/timelineDisplaySelect';
import Dropdown from 'components/Dropdown';

function GraphDisplaySelect(props) {
	return (
		<div style={containerStyle}>
			<span style={timelineDisplaySelectLabelStyle}>Graph Period:</span>
			<Dropdown
				style={graphSelectionDropdownStyle}
				options={[ 'none', 'week', 'month' ]}
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
			<span style={timelineDisplaySelectLabelStyle}>Graph Type:</span>
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
