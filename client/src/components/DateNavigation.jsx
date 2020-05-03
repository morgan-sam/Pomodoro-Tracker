import React from 'react';
import DateSelect from 'components/DateSelect';
import BounceButton from 'components/BounceButton';
import DateArrowButton from 'components/DateArrowButton';
import { getTodaysDateAsObj } from 'data/dates';
import { dateContainerStyle, todayBtnStyle } from 'styles/dateNavigation';

const DateNavigation = (props) => {
	return (
		<div style={dateContainerStyle} className={'dateNavigation'}>
			<DateSelect
				date={props.filterOptions.date}
				setDate={(dateObj) => {
					props.setFilterOptions({
						...props.filterOptions,
						date: dateObj
					});
				}}
			/>
			<div>
				<DateArrowButton {...props} direction={'left'} />
				<BounceButton
					style={{ ...todayBtnStyle }}
					onClick={() =>
						props.setFilterOptions({
							...props.filterOptions,
							date: getTodaysDateAsObj().date
						})}
					delay={500}
					text={'Reset To Today'}
					style={{ margin: '1rem', padding: '0.6rem 1rem' }}
				/>
				<DateArrowButton {...props} direction={'right'} />
			</div>
		</div>
	);
};
export default DateNavigation;
