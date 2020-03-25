import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/timeFunctions';

function TimeOptionSelect(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(4, 5rem)'
	};

	const timeOptionLabelStyle = {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column'
	};

	return (
		<div style={containerStyle}>
			<span style={timeOptionLabelStyle}>Start Hour:</span>
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
				style={{ width: '5rem' }}
			/>
			<span style={timeOptionLabelStyle}>End Hour:</span>
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
					props.setTimeOptions({
						...props.timeOptions,
						endTime: props.timeOptions.twelveHourClock ? convert12hrTo24hrTime(el) : el
					});
				}}
				options={getArrayTimes(props.timeOptions.twelveHourClock, 1).slice(props.timeOptions.startTime)}
				style={{ width: '5rem' }}
			/>
		</div>
	);
}
export default TimeOptionSelect;
