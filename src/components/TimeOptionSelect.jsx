import React from 'react';
import Dropdown from 'components/Dropdown';

function TimeOptionSelect(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(4, 5rem)'
	};

	return (
		<div style={containerStyle}>
			<span>Start Hour:</span>
			<Dropdown
				className={'dropdownStartHour'}
				default={props.timeOptions.startTime}
				onClick={(el) =>
					props.setTimeOptions({
						...props.timeOptions,
						startTime: el
					})}
				options={[ ...Array(24).keys() ].slice(0, props.timeOptions.endTime)}
				style={{ width: '5rem' }}
			/>
			<span>End Hour:</span>
			<Dropdown
				className={'dropdownEndHour'}
				default={props.timeOptions.endTime}
				onClick={(el) =>
					props.setTimeOptions({
						...props.timeOptions,
						endTime: el
					})}
				options={[ ...Array(24).keys() ].map((el) => el + 1).slice(props.timeOptions.startTime)}
				style={{ width: '5rem' }}
			/>
		</div>
	);
}
export default TimeOptionSelect;
