import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/parseTime';

function TimeOptionSelect(props) {
	return (
		<div className={'time-option'}>
			<div>
				<span className={'time-option-label time-option-element'}>Start Hour:</span>
				<Dropdown
					className={'time-option-drop-down'}
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
					style={{ zIndex: '2' }}
				/>
			</div>
			<div>
				<span className={'time-option-label time-option-element'}>End Hour:</span>
				<Dropdown
					className={'time-option-drop-down'}
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
					style={{ zIndex: '1' }}
				/>
			</div>
		</div>
	);
}
export default TimeOptionSelect;
