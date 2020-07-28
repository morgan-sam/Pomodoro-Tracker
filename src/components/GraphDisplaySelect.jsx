import React from 'react';
import Dropdown from 'components/Dropdown';
import { graphPeriodOptions } from 'data/defaultState';

function GraphDisplaySelect(props) {
	return (
		<div className={'graph-option-container'} style={{ ...props.style }}>
			<div>
				<span className={'graph-display-select-label'}>Default Graph Period:</span>
				<Dropdown
					className={'graph-period-select graph-selection-dropdown'}
					style={{ zIndex: '2' }}
					options={graphPeriodOptions}
					default={props.options.graph.period}
					onClick={(el) =>
						props.setOptions({
							...props.options,
							graph: {
								...props.options.graph,
								period: el
							}
						})}
				/>
			</div>
			<div>
				<span className={'graph-display-select-label'}>Line/Scatter Graph:</span>
				<Dropdown
					className={'graph-type-select graph-selection-dropdown'}
					options={[ 'scatter', 'line', 'both' ]}
					default={props.options.graph.type}
					onClick={(el) =>
						props.setOptions({
							...props.options,
							graph: {
								...props.options.graph,
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
					value={props.options.graph.maxPomodoro}
					onChange={(el) => {
						props.setOptions({
							...props.options,
							graph: {
								...props.options.graph,
								maxPomodoro: el.target.value
							}
						});
					}}
					step="1"
					style={{ width: '10rem' }}
				/>
				<div style={{ width: '1rem', padding: '1rem' }}>{props.options.graph.maxPomodoro}</div>
			</div>
		</div>
	);
}

export default GraphDisplaySelect;
