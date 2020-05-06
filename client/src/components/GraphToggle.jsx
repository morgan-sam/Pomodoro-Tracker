import React from 'react';
import Checkbox from 'components/Checkbox';

function GraphToggle(props) {
	const { displayOptions, setDisplayOptions } = props;

	const containerStyle = {
		display: 'flex'
	};

	const commonMargin = {
		margin: '1rem 0'
	};

	return (
		<div style={containerStyle}>
			<div style={commonMargin}>Graph Visible:</div>
			<Checkbox
				style={{ ...commonMargin, borderRadius: '100%', margin: '1rem' }}
				default={displayOptions.graph.visible}
				onChange={() => {
					setDisplayOptions({
						...displayOptions,
						graph: {
							...displayOptions.graph,
							visible: !displayOptions.graph.visible
						}
					});
				}}
			/>
		</div>
	);
}
export default GraphToggle;
