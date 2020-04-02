import React from 'react';
import DateSelect from 'components/DateSelect';
import { parseISOToDateObj, parseDateObjToISO } from 'utility/parseDates';
import { getDayFromTodayAsISO } from 'data/dates';
import { dateContainerStyle, todayBtnStyle, centerContainer } from 'styles/dateNavigation';
import BounceButton from './BounceButton';
import DateArrowButton from './DateArrowButton';

const DateNavigation = (props) => {
	return (
		<div style={dateContainerStyle} className={'dateNavigation'}>
			<DateArrowButton {...props} direction={'left'} />
			<div style={centerContainer}>
				<DateSelect
					date={parseISOToDateObj(props.filterOptions.date)}
					setDate={(dateObj) => {
						props.setFilterOptions({
							...props.filterOptions,
							date: parseDateObjToISO(dateObj)
						});
					}}
				/>
				<BounceButton
					style={{ ...todayBtnStyle }}
					onClick={() =>
						props.setFilterOptions({
							...props.filterOptions,
							date: getDayFromTodayAsISO()
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
