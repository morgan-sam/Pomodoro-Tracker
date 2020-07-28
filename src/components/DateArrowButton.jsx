import React, { useContext } from 'react';
import { addSubtractDaysFromDateObj } from 'data/dates';
import { getSystemButtonStyle } from 'styles/settings';
import ThemeContext from 'context/theme';

const DateArrowButton = (props) => {
	const darkTheme = useContext(ThemeContext);
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
