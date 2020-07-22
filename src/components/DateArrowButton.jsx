import React from 'react';
import { addSubtractDaysFromDateObj } from 'data/dates';

const DateArrowButton = (props) => {
	const dayDifference = props.direction === 'left' ? -1 : 1;
	return (
		<button
			className={'arrow-button'}
			style={props.style}
			onClick={() => props.setDate(addSubtractDaysFromDateObj(props.date, dayDifference))}
		>
			<span role="img" aria-label={`${props.direction}-arrow`}>
				{props.direction === 'left' ? `⬅` : `➡`}
			</span>
		</button>
	);
};

export default DateArrowButton;
