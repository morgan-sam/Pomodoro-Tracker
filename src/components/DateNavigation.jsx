import React from 'react';
import DateSelect from 'components/DateSelect';
import BounceButton from 'components/BounceButton';
import DateArrowButton from 'components/DateArrowButton';
import { getTodaysDateAsObj } from 'data/dates';

const DateNavigation = (props) => {
	return (
		<div className={'date-nav-container'}>
			<DateSelect
				date={props.date}
				setDate={(dateObj) => {
					props.setDate(dateObj);
				}}
			/>
			<div>
				<DateArrowButton {...props} direction={'left'} />
				<BounceButton
					onClick={() => props.setDate(getTodaysDateAsObj().date)}
					delay={500}
					text={'Reset To Today'}
					style={{ margin: '1rem', padding: '1rem' }}
				/>
				<DateArrowButton {...props} direction={'right'} />
			</div>
		</div>
	);
};
export default DateNavigation;
