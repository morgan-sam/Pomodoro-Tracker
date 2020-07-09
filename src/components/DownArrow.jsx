import React from 'react';
import arrow from 'img/doubledown.png';

const DownArrow = (props) => {
	const { type } = props;
	return (
		<img
			src={arrow}
			style={{
				position: 'absolute',
				height: '5rem',
				margin: '2rem 0',
				left: '50vw',
				transform: `scaleY(${type === 'up' ? -1 : 1}) translateX(-50%)`,
				top: type === 'up' ? '0' : null,
				bottom: type === 'down' ? '0' : null
			}}
		/>
	);
};

export default DownArrow;
