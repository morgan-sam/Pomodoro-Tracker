import React from 'react';
import Checkbox from 'components/Checkbox';

function GraphToggle(props) {
	const containerStyle = {
		display: 'flex',
		padding: '0 4rem'
	};

	const commonMargin = {
		margin: '1rem'
	};

	return (
		<div style={containerStyle}>
			<div style={commonMargin}>Graph Visible:</div>
			<Checkbox style={{ ...commonMargin, borderRadius: '100%' }} onChange={() => null} />
		</div>
	);
}
export default GraphToggle;
