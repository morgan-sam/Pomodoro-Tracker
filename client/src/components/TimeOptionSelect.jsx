import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/parseTime';
import {
	timeOptionLabelStyle,
	timeOptionStyle,
	subContainers,
	elementStyle,
	dropDownStyle
} from 'styles/timeOptionSelect';

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
					style={{ ...dropDownStyle, zIndex: '2' }}
				/>
			</div>
			<div style={subContainers}>
				<span style={{ ...timeOptionLabelStyle, ...elementStyle }}>End Hour:</span>
				<Dropdown
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
					style={{ ...dropDownStyle, zIndex: '1' }}
				/>
			</div>
		</div>
	);
}
export default TimeOptionSelect;
