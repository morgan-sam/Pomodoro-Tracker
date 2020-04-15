import React from 'react';
import DateSelect from 'components/DateSelect';
import { getTodaysDateAsObj } from 'data/dates';
import { dateContainerStyle, todayBtnStyle, centerContainer } from 'styles/dateNavigation';
import BounceButton from './BounceButton';
import DateArrowButton from './DateArrowButton';

const DateNavigation = (props) => {
	return (
		<div style={dateContainerStyle} className={'dateNavigation'}>
			<DateArrowButton {...props} direction={'left'} />
			<div style={centerContainer}>
				<DateSelect
					date={props.filterOptions.date}
					setDate={(dateObj) => {
						props.setFilterOptions({
							...props.filterOptions,
							date: dateObj
						});
					}}
				/>
				<BounceButton
					style={{ ...todayBtnStyle }}
					onClick={() =>
						props.setFilterOptions({
							...props.filterOptions,
							date: getTodaysDateAsObj()
						})}
					delay={500}
					text={'Reset To Today'}
				/>
			</div>
			<DateArrowButton {...props} direction={'right'} />
		</div>
	);
};
export default DateNavigation;
