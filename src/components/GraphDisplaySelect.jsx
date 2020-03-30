import React from 'react';
import BounceButton from './BounceButton';
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
			<span style={timelineDisplaySelectLabelStyle}>Graph Selection:</span>
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
		</div>
	);
}

export default GraphDisplaySelect;
