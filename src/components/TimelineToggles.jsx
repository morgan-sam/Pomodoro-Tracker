import React from 'react';
import { standardButtonStyle } from 'styles/standard';

function TimelineToggles(props) {
	const containerStyle = {
		display: 'grid',
		gap: '1rem',
		gridAutoFlow: 'column',
		gridTemplateColumns: 'repeat(3, 10rem)'
	};

	const toggleButtonStyle = {
		height: '2rem',
		width: '10rem'
	};

	return (
		<div style={containerStyle}>
			<button
				style={{ ...toggleButtonStyle, ...standardButtonStyle }}
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
				style={{ ...toggleButtonStyle, ...standardButtonStyle }}
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
				style={{ ...toggleButtonStyle, ...standardButtonStyle }}
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
