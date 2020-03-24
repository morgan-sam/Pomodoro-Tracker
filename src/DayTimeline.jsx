import React, { useEffect, useState } from 'react';

function DayTimeline() {
	const containerStyle = {
		display: 'flex',
		width: '50%',
		overflowX: 'scroll'
	};

	const boxStyle = {
		height: '5rem',
		width: '5rem',
		minWidth: '5rem',
		border: '1px solid black'
	};

	const textStyle = {
		textAlign: 'center',
		verticalAlign: 'middle',
		padding: '0 5px'
	};

	const timelineBoxes = [ ...Array(24).keys() ].map((i) => {
		return (
			<div key={i} style={boxStyle}>
				<span style={textStyle}>{convert24hrTo12hrTime(i)}</span>
			</div>
		);
	});

	function convert24hrTo12hrTime(i) {
		const period = i < 12 ? 'am' : 'pm';
		let newTime = i % 12;
		if (newTime === 0) newTime = 12;
		return newTime + period;
	}

	console.log(timelineBoxes);

	return <div style={containerStyle}>{timelineBoxes}</div>;
}

export default DayTimeline;
