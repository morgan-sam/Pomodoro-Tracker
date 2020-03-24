import React from 'react';
import DateSelect from 'components/DateSelect';
import { getISODateXDaysAway } from 'utility/timeFunctions';
import { parseISOToDateObj, parseDateObjToISO } from 'utility/parseDates';

const DateNavigation = (props) => {
	const arrowIconStyle = {
		height: '2rem',
		width: '2.5rem',
		fontSize: '1.3rem',
		verticalAlign: 'middle',
		textAlign: 'center',
		lineHeight: '0',
		top: '50%',
		transform: 'translateY(50%)'
	};

	const dateContainerStyle = {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		width: '20rem',
		verticalAlign: 'middle'
	};

	return (
		<div style={dateContainerStyle}>
			<button
				style={arrowIconStyle}
				onClick={() =>
					props.setFilterOptions({
						...props.filterOptions,
						date: getISODateXDaysAway(props.filterOptions.date, -1)
					})}
			>
				⬅️
			</button>
			<DateSelect
				date={parseISOToDateObj(props.filterOptions.date)}
				setDate={(dateObj) => {
					props.setFilterOptions({
						...props.filterOptions,
						date: parseDateObjToISO(dateObj)
					});
				}}
			/>
			<button
				style={arrowIconStyle}
				onClick={() =>
					props.setFilterOptions({
						...props.filterOptions,
						date: getISODateXDaysAway(props.filterOptions.date, 1)
					})}
			>
				➡️
			</button>
		</div>
	);
};
export default DateNavigation;
