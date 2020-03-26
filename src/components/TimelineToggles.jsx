import React from 'react';
import BounceButton from './BounceButton';

function TimelineToggles(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(3, 10rem)',
		zIndex: '0'
	};

	const toggleButtonStyle = {
		height: '2rem',
		width: '10rem'
	};

	return (
		<div style={containerStyle}>
			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							encore: !props.displayOptions.visibility.encore
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.visibility.encore ? 'Off' : 'On'} Encores`}
			/>
			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							start: !props.displayOptions.visibility.start
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.visibility.start ? 'Off' : 'On'} Start Markers`}
			/>

			<BounceButton
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							grid: !props.displayOptions.visibility.grid
						}
					})}
				delay={300}
				style={toggleButtonStyle}
				text={`Turn ${props.displayOptions.visibility.grid ? 'Off' : 'On'} Grid`}
			/>
		</div>
	);
}

export default TimelineToggles;
