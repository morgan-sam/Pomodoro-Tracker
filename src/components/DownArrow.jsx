import React from 'react';
import arrow from 'img/doubledown.png';

const DownArrow = (props) => {
	const { type, onClick } = props;
	return (
		<img
			onClick={onClick}
			src={arrow}
			style={{
				height: '8vh',
				margin: '3rem 0',
				transform: `scaleY(${type === 'up' ? -1 : 1})`,
				cursor: 'pointer'
			}}
		/>
	);
};

export default DownArrow;
