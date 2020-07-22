import React from 'react';
import Checkbox from 'components/Checkbox';

function GraphToggle(props) {
	const { options, setOptions } = props;

	const containerStyle = {
		display: 'flex',
		margin: '2rem 0'
	};

	const commonMargin = {
		margin: '1rem 0'
	};

	return (
		<div style={containerStyle}>
			<div style={commonMargin}>Graph Visible:</div>
			<Checkbox
				style={{ ...commonMargin, borderRadius: '100%', margin: '1rem' }}
				default={options.graph.visible}
				options={options}
				onChange={() => {
					setOptions({
						...options,
						graph: {
							...options.graph,
							visible: !options.graph.visible
						}
					});
				}}
			/>
		</div>
	);
}
export default GraphToggle;
