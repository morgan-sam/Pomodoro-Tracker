import React from 'react';
import {
	graphDisplaySelectLabelStyle,
	graphSelectionDropdownStyle,
	graphOptionLabelStyle,
	graphPeriodSelectStyle,
	commonMargin
} from 'styles/graphDisplaySelect';
import Dropdown from 'components/Dropdown';

function GraphDisplaySelect(props) {
	return (
		<div style={{ ...props.style }}>
			<div style={commonMargin}>
				<span style={{ ...graphDisplaySelectLabelStyle }}>Graph Period:</span>
				<Dropdown
					className={'dropdownGraphPeriod'}
					style={{ ...graphSelectionDropdownStyle, ...graphPeriodSelectStyle, zIndex: '2' }}
					options={[ 'week ahead', 'week passed', 'month' ]}
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
					className={'dropdownGraphType'}
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
