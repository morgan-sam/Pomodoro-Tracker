import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/timeFunctions';

function TimeOptionSelect(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(6, 5rem)',
		zIndex: '1'
	};

	const timeOptionLabelStyle = {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		height: '2rem',
		textAlign: 'center'
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
					const endTime = props.timeOptions.twelveHourClock ? convert12hrTo24hrTime(el) : el;
					props.setTimeOptions({
						...props.timeOptions,
						endTime: endTime === 0 ? 24 : endTime
					});
				}}
				options={getArrayTimes(props.timeOptions.twelveHourClock, 1).slice(props.timeOptions.startTime)}
				style={{ width: '5rem' }}
			/>
			<span style={timeOptionLabelStyle}>Timeline Zoom:</span>
			<input
				type="range"
				min="2"
				max="20"
				value={props.timeOptions.hourWidth}
				onChange={(e) => {
					props.setTimeOptions({
						...props.timeOptions,
						hourWidth: e.target.value
					});
				}}
				step="0.01"
				style={{ width: '15rem' }}
			/>
		</div>
	);
}
export default TimeOptionSelect;
