import React from 'react';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';

function BottomPanel(props) {
	const panelContainerStyle = {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		margin: '2rem 0'
	};

	return (
		<div style={panelContainerStyle}>
			<OptionsPanel
				entriesData={props.entriesData}
				setEntriesData={props.setEntriesData}
				filterOptions={props.filterOptions}
				setFilterOptions={props.setFilterOptions}
				timeOptions={props.timeOptions}
				setTimeOptions={props.setTimeOptions}
				displayOptions={props.displayOptions}
				setDisplayOptions={props.setDisplayOptions}
				style={{ margin: '2rem 8rem 0 0' }}
			/>
			<GraphPanel
				entriesData={props.entriesData}
				filterOptions={props.filterOptions}
				displayOptions={props.displayOptions}
			/>
		</div>
	);
}

export default BottomPanel;
