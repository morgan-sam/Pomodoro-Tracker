import React from 'react';
import DateSelect from 'components/DateSelect';
import { getTodaysDateAsObj } from 'data/dates';
import { dateContainerStyle, todayBtnStyle } from 'styles/dateNavigation';
import BounceButton from './BounceButton';
import DateArrowButton from './DateArrowButton';

const DateNavigation = (props) => {
	if (window.matchMedia('(max-width: 1000px)').matches) console.log(true);
	else console.log(false);

	const grid = {
		top: { gridArea: '1 / 1 / 2 / 4' },
		bottom: {
			left: { gridArea: '2 / 1 / 3 / 2' },
			center: { gridArea: '2 / 2 / 3 / 3' },
			right: { gridArea: '2 / 3 / 3 / 4' }
		}
	};

	let dateSelectStyle = { ...grid.top, margin: '0 auto' };
	let leftBtnStyle = {
		...grid.bottom.left,
		margin: '0 auto'
	};
	let resetBtnStyle = {
		...grid.bottom.center,
		height: '40%'
	};
	let rightBtnStyle = {
		...grid.bottom.right,
		margin: '0 auto'
	};

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
			<DateArrowButton {...props} direction={'left'} style={leftBtnStyle} />
			<BounceButton
				style={{ ...todayBtnStyle }}
				onClick={() =>
					props.setFilterOptions({
						...props.filterOptions,
						date: getTodaysDateAsObj().date
					})}
				delay={500}
				text={'Reset To Today'}
				style={resetBtnStyle}
			/>
			<DateArrowButton {...props} direction={'right'} style={rightBtnStyle} />
		</div>
	);
};
export default DateNavigation;
