import React from 'react';
import {
	graphDisplaySelectLabelStyle,
	graphSelectionDropdownStyle,
	graphOptionLabelStyle,
	graphPeriodSelectStyle
} from 'styles/graphDisplaySelect';
import Dropdown from 'components/Dropdown';

function GraphDisplaySelect(props) {
	const commonMargin = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '2rem 0'
	};

	return (
		<div style={{ ...props.style, width: '100%' }}>
			<div style={commonMargin}>
				<span style={{ ...graphDisplaySelectLabelStyle }}>Graph Period:</span>
				<Dropdown
					style={{ ...graphSelectionDropdownStyle, ...graphPeriodSelectStyle }}
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
			</div>
			<div style={commonMargin}>
				<span style={{ ...graphDisplaySelectLabelStyle }}>Graph Type:</span>
				<Dropdown
					style={{ ...graphSelectionDropdownStyle }}
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
			<div style={commonMargin}>
				<span style={{ ...graphOptionLabelStyle }}>Max Pomodoro:</span>
				<input
					type="range"
					min="1"
					max="20"
					value={props.displayOptions.graph.maxPomodoro}
					onChange={(el) => {
						props.setDisplayOptions({
							...props.displayOptions,
							graph: {
								...props.displayOptions.graph,
								maxPomodoro: el.target.value
							}
						});
					}}
					step="1"
					style={{ width: '10rem' }}
				/>
			</div>
		</div>
	);
}

export default GraphDisplaySelect;
