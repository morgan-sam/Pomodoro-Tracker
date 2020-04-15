import React from 'react';
import { arrowButtonDefaultStyle } from 'styles/dateArrowButton.js';
import { addSubtractDaysFromDateObj } from 'data/dates';

const DateArrowButton = (props) => {
	const dayDifference = props.direction === 'left' ? -1 : 1;
	return (
		<button
			className={'arrowbutton'}
			style={arrowButtonDefaultStyle}
			onClick={() =>
				props.setFilterOptions({
					...props.filterOptions,
					date: addSubtractDaysFromDateObj(props.filterOptions.date, dayDifference)
				})}
		>
			<span role="img" aria-label={`${props.direction}-arrow`}>
				{props.direction === 'left' ? `⬅` : `➡`}
			</span>
		</button>
	);
};

export default DateArrowButton;
