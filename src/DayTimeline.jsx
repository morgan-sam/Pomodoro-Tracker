import React, { useEffect, useState } from 'react';

function DayTimeline(props) {
	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 24,
		twelveHourClock: true,
		hourWidth: 3
	});

	const containerStyle = {
		display: 'inline-block',
		whiteSpace: 'nowrap',
		width: 'auto',
		maxWidth: '50%',
		overflowX: 'scroll',
		position: 'relative'
	};

	const boxStyle = {
		display: 'inline-block',
		height: '8rem',
		width: `${timeOptions.hourWidth}rem`,
		border: '1px solid black',
		boxSizing: 'border-box'
	};

	const textStyle = {
		textAlign: 'center',
		verticalAlign: 'middle',
		padding: '0 5px'
	};

	const timelineBoxes = [ ...Array(24).keys() ].map((i) => {
		return (
			<div key={i} style={boxStyle}>
				<span style={textStyle}>{timeOptions.twelveHourClock ? convert24hrTo12hrTime(i) : `${i}:00`}</span>
			</div>
		);
	});

	const eventBoxStyle = {
		display: 'inline-block',
		height: '5rem',
		border: '1px solid black',
		position: 'absolute',
		bottom: '0'
	};

	const eventBoxColor = {
		pomodoro: {
			backgroundColor: 'red'
		},
		encore: {
			backgroundColor: 'green'
		}
	};

	const finishEvents = props.entries.filter((el) => el.type === 'pomodoro');
	const encoreEvents = props.entries.filter((el) => el.type === 'encore');
	const pomodoroBoxes = finishEvents ? finishEvents.map((el, i) => convertEventToBox(el, i)) : [];
	const encoreBoxes = encoreEvents ? encoreEvents.map((el, i) => convertEventToBox(el, i)) : [];

	function convertEventToBox(el, i) {
		const time = convertISOToTimeObj(el.date);
		const timelinePosition = time.hours + time.minutes / 60 - props.eventLengths[el.type] / 60;
		const currentEventStyle = {
			left: `${(timelinePosition - timeOptions.startTime) * timeOptions.hourWidth}rem`
		};
		return (
			<div
				key={i}
				style={{
					...eventBoxStyle,
					...currentEventStyle,
					...eventBoxColor[el.type],
					width: `${timeOptions.hourWidth / 60 * props.eventLengths[el.type]}rem`
				}}
			>
				<span />
			</div>
		);
	}

	function convert24hrTo12hrTime(i) {
		const period = i < 12 ? 'am' : 'pm';
		let newTime = i % 12;
		if (newTime === 0) newTime = 12;
		return newTime + period;
	}

	function convertISOToTimeObj(isoString) {
		const timeLetters = isoString.split('').slice(11, 17);
		return {
			hours: parseInt(timeLetters[0] + timeLetters[1]),
			minutes: parseInt(timeLetters[3] + timeLetters[4])
		};
	}

	return (
		<div style={containerStyle}>
			{timelineBoxes.slice(timeOptions.startTime, timeOptions.endTime)}
			{pomodoroBoxes}
			{encoreBoxes}
		</div>
	);
}

export default DayTimeline;
