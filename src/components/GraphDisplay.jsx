import React, { useEffect, useRef } from 'react';

const GraphDisplay = (props) => {
	function drawX(coordinate, size) {
		const context = canvasRef.current.getContext('2d');
		const { x, y } = coordinate;
		context.beginPath();
		context.moveTo(x - size, y - size);
		context.lineTo(x + size, y + size);
		context.moveTo(x + size, y - size);
		context.lineTo(x - size, y + size);
		context.stroke();
	}
	const canvasRef = React.useRef(null);

	useEffect(
		() => {
			canvasRef.current.width = 750;
			canvasRef.current.height = 500;
			getArrayOfPomodoroDates();
		},
		[ props.entriesData ]
	);

	const getArrayOfPomodoroDates = () => {
		const dateArray = props.entriesData.flatMap(
			(el) => (el.type === 'pomodoro' ? [ el.date.substring(0, 10) ] : [])
		);
		console.log(dateArray);
		return dateArray;
	};

	const graphStyle = {
		display: 'flex',
		height: '20rem',
		width: '30rem',
		border: '1px solid black'
	};

	return (
		<canvas
			ref={canvasRef}
			style={graphStyle}
			onClick={(e) => {
				drawX({ x: 50, y: 50 }, 10);
			}}
		/>
	);
};

export default GraphDisplay;
