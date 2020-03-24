import React, { useEffect, useState } from 'react';

function DayTimeline(props) {
	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 24,
		twelveHourClock: true,
		hourWidth: 4
	});

	const containerStyle = {
		display: 'flex',
		width: '50%',
		overflowX: 'scroll',
		position: 'relative'
	};

	const boxStyle = {
		height: '8rem',
		minWidth: `${timeOptions.hourWidth}rem`,
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
		height: '5rem',
		minWidth: `${timeOptions.hourWidth}rem`,
		backgroundColor: 'red',
		border: '1px solid black',
		position: 'absolute',
		bottom: '0'
	};

	const eventBoxes = props.entries.map((el, i) => {
		const time = convertISOToTimeObj(el.date);
		const timelinePosition = time.hours + time.minutes / 60;
		const currentEventStyle = {
			left: `${(timelinePosition - timeOptions.startTime) * timeOptions.hourWidth}rem`
		};
		return (
			<div key={i} style={{ ...eventBoxStyle, ...currentEventStyle }}>
				<span />
			</div>
		);
	});

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
			{eventBoxes}
		</div>
	);
}

export default DayTimeline;
