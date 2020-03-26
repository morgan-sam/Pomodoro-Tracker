import React from 'react';
import { arrowButtonDefaultStyle } from 'styles/standard.js';
import { getISODateXDaysAway } from 'utility/timeFunctions';

const DateArrowButton = (props) => {
	return (
		<button
			className={'arrowbutton'}
			style={arrowButtonDefaultStyle}
			onClick={() =>
				props.setFilterOptions({
					...props.filterOptions,
					date: getISODateXDaysAway(props.filterOptions.date, props.direction === 'left' ? -1 : 1)
				})}
		>
			<span role="img" aria-label={`${props.direction}-arrow`}>
				{props.direction === 'left' ? `⬅` : `➡`}
			</span>
		</button>
	);
};

export default DateArrowButton;