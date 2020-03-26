import React from 'react';
import DateSelect from 'components/DateSelect';
import { getISODateXDaysAway } from 'utility/timeFunctions';
import { parseISOToDateObj, parseDateObjToISO } from 'utility/parseDates';
import { getDayFromTodayAsISO } from 'data/dates';
import { standardButtonStyle } from 'styles/standard.js';
import BounceButton from './BounceButton';

const DateNavigation = (props) => {
	const arrowIconStyle = {
		height: '2rem',
		width: '2.5rem',
		fontSize: '1.3rem',
		verticalAlign: 'middle',
		textAlign: 'center',
		lineHeight: '0',
		transform: 'translateY(-10%)'
	};

	const dateContainerStyle = {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		width: '20rem',
		verticalAlign: 'middle',
		alignItems: 'center'
	};

	const todayBtnStyle = {
		height: '2rem',
		width: 'auto',
		padding: '0 1rem',
		verticalAlign: 'middle',
		textAlign: 'center'
	};

	const centerContainer = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '0 1rem'
	};

	return (
		<div style={dateContainerStyle} className={'dateNavigation'}>
			<button
				style={{ ...arrowIconStyle, ...standardButtonStyle }}
				onClick={() =>
					props.setFilterOptions({
						...props.filterOptions,
						date: getISODateXDaysAway(props.filterOptions.date, -1)
					})}
			>
				<span role="img" aria-label="left-arrow">
					⬅️
				</span>
			</button>
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
					style={{ ...todayBtnStyle, ...standardButtonStyle }}
					onClick={() =>
						props.setFilterOptions({
							...props.filterOptions,
							date: getDayFromTodayAsISO()
						})}
					delay={500}
					text={'Reset To Today'}
				/>
			</div>
			<button
				style={{ ...arrowIconStyle, ...standardButtonStyle }}
				onClick={() =>
					props.setFilterOptions({
						...props.filterOptions,
						date: getISODateXDaysAway(props.filterOptions.date, 1)
					})}
			>
				<span role="img" aria-label="right-arrow">
					➡️
				</span>
			</button>
		</div>
	);
};
export default DateNavigation;
