import React, { useState } from 'react';
import GraphCanvas from 'components/GraphCanvas';
import { getSystemButtonStyle } from 'styles/settings';
import { graphPeriodOptions } from 'data/defaultState';
import { monthStringArray } from 'data/dates';

function GraphPanel(props) {
	const { date, setDate, options, entriesData } = props;
	const [ periodOffset, setPeriodOffset ] = useState(0);
	const darkTheme = props.options.darkTheme;

	const getNewPeriod = () => {
		const index = graphPeriodOptions.findIndex((el) => el === options.graph.period);
		return graphPeriodOptions[(index + periodOffset) % graphPeriodOptions.length];
	};

	return (
		<div className={'canvas-container'} style={props.style}>
			<div
				className={'switch-graph-view-btn'}
				style={getSystemButtonStyle(darkTheme)}
				onClick={() => setPeriodOffset((periodOffset + 1) % graphPeriodOptions.length)}
			>
				Switch View
			</div>
			{getNewPeriod() === 'month' ? (
				<div className={'switch-month-btn-container'}>
					<button style={getSystemButtonStyle(darkTheme)} onClick={() => setDate}>{`⬅ ${monthStringArray[
						date.month - 2
					]}`}</button>
					<button style={getSystemButtonStyle(darkTheme)}>{`${monthStringArray[date.month]} ➡`}</button>
				</div>
			) : null}
			<GraphCanvas
				entriesData={entriesData}
				date={date}
				options={options}
				{...options.graph}
				period={getNewPeriod()}
			/>
		</div>
	);
}

export default GraphPanel;
