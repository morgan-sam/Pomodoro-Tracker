import React from 'react';
import DateSelect from 'components/DateSelect';
import { getTodaysDateAsObj } from 'data/dates';
import { dateContainerStyle, todayBtnStyle } from 'styles/dateNavigation';
import BounceButton from './BounceButton';
import DateArrowButton from './DateArrowButton';

const DateNavigation = (props) => {
	if (window.matchMedia('(max-width: 1000px)').matches) console.log(true);
	else console.log(false);

	let dateSelectStyle = {
		//
	};

	let dayNavigateStyle = {};

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
				style={dateSelectStyle}
			/>
			<div style={dayNavigateStyle}>
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
