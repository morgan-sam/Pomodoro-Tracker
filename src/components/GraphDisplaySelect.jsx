import React from 'react';
import Dropdown from 'components/Dropdown';

function GraphDisplaySelect(props) {
	return (
		<div className={'graph-option-container'} style={{ ...props.style }}>
			<div>
				<span className={'graph-display-select-label'}>Graph Period:</span>
				<Dropdown
					className={'graph-selection-dropdown graph-period-select'}
					style={{ zIndex: '2' }}
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
			<div>
				<span className={'graph-display-select-label'}>Graph Type:</span>
				<Dropdown
					className={'graph-selection-dropdown'}
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
			<div>
				<span className={'graph-option-label'}>Max Pomodoro:</span>
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
