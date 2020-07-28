import React from 'react';
import { addSubtractDaysFromDateObj } from 'data/dates';
import { getSystemButtonStyle } from 'styles/settings';

const DateArrowButton = (props) => {
	const darkTheme = props.options.darkTheme;
	const dayDifference = props.direction === 'left' ? -1 : 1;
	return (
		<button
			className={'arrow-button'}
			style={getSystemButtonStyle(darkTheme)}
			onClick={() => props.setDate(addSubtractDaysFromDateObj(props.date, dayDifference))}
		>
			<span role="img" aria-label={`${props.direction}-arrow`}>
				{props.direction === 'left' ? `⬅` : `➡`}
			</span>
		</button>
	);
};

export default DateArrowButton;
