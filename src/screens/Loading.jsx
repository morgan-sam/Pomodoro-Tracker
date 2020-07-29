import React, { useState, useEffect } from 'react';

const Loading = () => {
	const [ dotCount, setDotCount ] = useState(1);

	useEffect(() => {
		setTimeout(() => {
			setDotCount(Math.max(1, (dotCount + 1) % 4));
		}, 500);
	});

	return <div className={'loading-screen'}>{`Loading${'.'.repeat(dotCount)}`}</div>;
};

export default Loading;
