import React from 'react';
import Dropdown from 'components/Dropdown';
import { convert24hrTo12hrTime, convert12hrTo24hrTime, getArrayTimes } from 'utility/parseTime';

function optionselect(props) {
	return (
		<div className={'time-option'}>
			<div>
				<span className={'time-option-label time-option-element'}>Start Hour:</span>
				<Dropdown
					className={'start-time-select time-option-drop-down'}
					default={
						props.options.twelveHourClock ? (
							convert24hrTo12hrTime(props.options.startTime)
						) : (
							props.options.startTime
						)
					}
					onClick={(el) => {
						props.setOptions({
							...props.options,
							timeline: {
								...props.options.timeline,
								startTime: props.options.twelveHourClock ? convert12hrTo24hrTime(el) : el
							}
						});
					}}
					options={getArrayTimes(props.options.twelveHourClock, 0).slice(0, props.options.endTime)}
					style={{ zIndex: '2' }}
				/>
			</div>
			<div>
				<span className={'time-option-label time-option-element'}>End Hour:</span>
				<Dropdown
					className={'end-time-select time-option-drop-down'}
					default={
						props.options.twelveHourClock ? (
							convert24hrTo12hrTime(props.options.endTime)
						) : (
							props.options.endTime
						)
					}
					onClick={(el) => {
						const endTime = props.options.twelveHourClock ? convert12hrTo24hrTime(el) : el;
						props.setOptions({
							...props.options,
							timeline: {
								...props.options.timeline,
								endTime: endTime === 0 ? 24 : endTime
							}
						});
					}}
					options={getArrayTimes(props.options.twelveHourClock, 1).slice(props.options.startTime)}
					style={{ zIndex: '1' }}
				/>
			</div>
		</div>
	);
}
export default optionselect;
