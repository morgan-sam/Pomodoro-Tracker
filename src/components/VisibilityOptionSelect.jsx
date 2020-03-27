import React from 'react';
import BounceButton from './BounceButton';
import {
	containerStyle,
	toggleButtonStyle,
	visibilityOptionLabelStyle,
	graphSelectionDropdownStyle
} from 'styles/visibilityOptionSelect';
import Dropdown from 'components/Dropdown';

function VisibilityOptionSelect(props) {
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
			<span style={visibilityOptionLabelStyle}>Graph Selection:</span>
			<Dropdown
				style={graphSelectionDropdownStyle}
				options={[ 'none', 'week', 'month' ]}
				default={props.displayOptions.visibility.graph}
				onClick={(el) =>
					props.setDisplayOptions({
						...props.displayOptions,
						visibility: {
							...props.displayOptions.visibility,
							graph: el
						}
					})}
			/>
		</div>
	);
}

export default VisibilityOptionSelect;
