import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime } from 'utility/timeFunctions';

function TimeOptionSelect(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(4, 5rem)'
	};

	function getArrayTimes(timeOptions, offset) {
		if (timeOptions.twelveHourClock) {
			return [ ...Array(24).keys() ].map((el) => convert24hrTo12hrTime(el + offset));
		} else {
			return [ ...Array(24).keys() ].map((el) => el + offset);
		}
	}

	console.log(getArrayTimes(props.timeOptions));

	return (
		<div style={containerStyle}>
			<span>Start Hour:</span>
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
				options={getArrayTimes(props.timeOptions, 0).slice(0, props.timeOptions.endTime)}
				style={{ width: '5rem' }}
			/>
			<span>End Hour:</span>
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
				options={getArrayTimes(props.timeOptions, 1).slice(props.timeOptions.startTime)}
				style={{ width: '5rem' }}
			/>
		</div>
	);
}
export default TimeOptionSelect;
