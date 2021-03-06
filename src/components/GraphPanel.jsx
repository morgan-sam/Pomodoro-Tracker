import React, { useState, useContext } from 'react';
import GraphCanvas from 'components/GraphCanvas';
import { getSystemButtonStyle } from 'styles/settings';
import { graphPeriodOptions } from 'data/defaultState';
import { monthStringArray, addSubtractMonthsFromDateObj } from 'data/dates';
import { DarkThemeContext } from 'context/theme';
import { convertTextToTitleCase } from 'utility/parseText';

function GraphPanel(props) {
	const { date, setDate, options, entriesData } = props;
	const [ periodOffset, setPeriodOffset ] = useState(0);
	const darkTheme = useContext(DarkThemeContext);

	const getNewPeriod = () => {
		const index = graphPeriodOptions.findIndex((el) => el === options.graph.period);
		return graphPeriodOptions[(index + periodOffset) % graphPeriodOptions.length];
	};

	return (
		<div className={'canvas-container'} style={props.style}>
			{entriesData.length > 0 && (
				<div
					className={'switch-graph-view-btn'}
					style={getSystemButtonStyle(darkTheme)}
					onClick={() => setPeriodOffset((periodOffset + 1) % graphPeriodOptions.length)}
				>
					{convertTextToTitleCase(getNewPeriod())}
				</div>
			)}
			{getNewPeriod() === 'month' ? (
				<div className={'switch-month-btn-container'}>
					<button
						className={'switch-month-btn'}
						style={{ ...getSystemButtonStyle(darkTheme), padding: '0.5rem' }}
						onClick={() => setDate(addSubtractMonthsFromDateObj(date, -1))}
					>{`⬅   ${monthStringArray[(date.month - 2 + 12) % 12]}`}</button>
					<button
						className={'switch-month-btn'}
						style={{ ...getSystemButtonStyle(darkTheme), padding: '0.5rem' }}
						onClick={() => setDate(addSubtractMonthsFromDateObj(date, 1))}
					>{`${monthStringArray[(date.month + 12) % 12]}   ➡`}</button>
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
