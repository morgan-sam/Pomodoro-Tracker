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
			console.log(props.entriesData);
			canvasRef.current.width = 750;
			canvasRef.current.height = 500;
		},
		[ props.entriesData ]
	);

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
