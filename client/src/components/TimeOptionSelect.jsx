import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/parseTime';
import { timeOptionLabelStyle } from 'styles/timeOptionSelect';
// import { containerStyle } from 'styles/optionsPanel';

const timeOptionStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	flexWrap: 'wrap',
	width: '100%',
	height: '100%'
};
const subContainers = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'stretch',
	width: '1fr',
	margin: '1rem',
	height: 'auto',
	boxSizing: 'border-box'
};
const elementStyle = { margin: '1rem' };
const dropDownStyle = { ...elementStyle, width: '5rem' };

function TimeOptionSelect(props) {
	return (
		<div style={timeOptionStyle}>
			<div style={subContainers}>
				<span style={{ ...timeOptionLabelStyle, ...elementStyle }}>Start Hour:</span>
				<Dropdown
					className={'dropdownStartHour'}
					default={
						props.timeOptions.twelveHourClock ? (
							convert24hrTo12hrTime(props.timeOptions.startTime)
						) : (
							props.timeOptions.startTime
						)
					}
					onClick={(el) => {
						props.setTimeOptions({
							...props.timeOptions,
							startTime: props.timeOptions.twelveHourClock ? convert12hrTo24hrTime(el) : el
						});
					}}
					options={getArrayTimes(props.timeOptions.twelveHourClock, 0).slice(0, props.timeOptions.endTime)}
					style={dropDownStyle}
				/>
			</div>
			<div style={subContainers}>
				<span style={{ ...timeOptionLabelStyle, ...elementStyle }}>End Hour:</span>
				<Dropdown
					style={elementStyle}
					className={'dropdownEndHour'}
					default={
						props.timeOptions.twelveHourClock ? (
							convert24hrTo12hrTime(props.timeOptions.endTime)
						) : (
							props.timeOptions.endTime
						)
					}
					onClick={(el) => {
						const endTime = props.timeOptions.twelveHourClock ? convert12hrTo24hrTime(el) : el;
						props.setTimeOptions({
							...props.timeOptions,
							endTime: endTime === 0 ? 24 : endTime
						});
					}}
					options={getArrayTimes(props.timeOptions.twelveHourClock, 1).slice(props.timeOptions.startTime)}
					style={dropDownStyle}
				/>
			</div>
		</div>
	);
}
export default TimeOptionSelect;
