import React from 'react';
import DateSelect from 'components/DateSelect';
import DateArrowButton from 'components/DateArrowButton';
import { getTodaysDateAsObj } from 'data/dates';
import { getSystemButtonStyle } from 'styles/settings';

const DateNavigation = (props) => {
	const darkTheme = props.options.darkTheme;
	return (
		<div className={'date-nav-container'}>
			<DateSelect
				date={props.date}
				setDate={(dateObj) => {
					props.setDate(dateObj);
				}}
			/>
			<div className={'date-nav-arrow-container'}>
				<DateArrowButton {...props} direction={'left'} />
				<button
					onClick={() => props.setDate(getTodaysDateAsObj().date)}
					style={getSystemButtonStyle(darkTheme)}
				>
					{'Reset To Today'}
				</button>
				<DateArrowButton {...props} direction={'right'} />
			</div>
		</div>
	);
};
export default DateNavigation;
