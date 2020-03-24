import React from 'react';
import Dropdown from 'components/Dropdown';
import { getMonthIntegers, arrayOfMonthDays, get21stCenturyYears } from 'data/dates';
import { dateSelectStyle } from 'styles/dateSelect';

const DateSelect = (props) => {
	return (
		<div className="dateSelect" style={{ ...dateSelectStyle, ...props.style }}>
			<div className="dropdownLabel">Day</div>
			<div className="dropdownLabel">Month</div>
			<div className="dropdownLabel">Year</div>
			<Dropdown
				default={props.date.day}
				options={arrayOfMonthDays(props.date.month, props.date.year)}
				onClick={(val) => {
					props.setDate({ ...props.date, day: val });
				}}
			/>
			<Dropdown
				default={props.date.month}
				options={getMonthIntegers()}
				onClick={(val) => {
					props.setDate({ ...props.date, month: val });
				}}
			/>
			<Dropdown
				default={props.date.year}
				options={get21stCenturyYears()}
				onClick={(val) => {
					props.setDate({ ...props.date, year: val });
				}}
			/>
		</div>
	);
};

export default DateSelect;
