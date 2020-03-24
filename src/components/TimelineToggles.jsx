import React from 'react';
import { containerStyle } from '../styles/timelineStyles';

function TimelineToggles(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(3, 10rem)'
	};

	return (
		<div style={containerStyle}>
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							encore: !props.displayOptions.visibility.encore
						}
					})}
			>
				Turn {props.displayOptions.visibility.encore ? 'Off' : 'On'} Encores
			</button>
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							start: !props.displayOptions.visibility.start
						}
					})}
			>
				Turn {props.displayOptions.visibility.start ? 'Off' : 'On'} Start Markers
			</button>
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							grid: !props.displayOptions.visibility.grid
						}
					})}
			>
				Turn {props.displayOptions.visibility.grid ? 'Off' : 'On'} Grid
			</button>
		</div>
	);
}

export default TimelineToggles;
