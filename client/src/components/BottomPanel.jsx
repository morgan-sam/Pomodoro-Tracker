import React from 'react';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';

function BottomPanel(props) {
	const panelContainerStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: '1fr'
	};

	const graphPanelStyle = null;
	const optionsPanelStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	return (
		<div style={panelContainerStyle}>
			<GraphPanel
				entriesData={props.entriesData}
				filterOptions={props.filterOptions}
				displayOptions={props.displayOptions}
				style={graphPanelStyle}
			/>
			<OptionsPanel
				entriesData={props.entriesData}
				setEntriesData={props.setEntriesData}
				filterOptions={props.filterOptions}
				setFilterOptions={props.setFilterOptions}
				timeOptions={props.timeOptions}
				setTimeOptions={props.setTimeOptions}
				displayOptions={props.displayOptions}
				setDisplayOptions={props.setDisplayOptions}
				style={optionsPanelStyle}
			/>
		</div>
	);
}

export default BottomPanel;
