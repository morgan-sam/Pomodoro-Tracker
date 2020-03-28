import React, { useState } from 'react';
import DayTimeline from './DayTimeline';
import TopPageText from 'components/TopPageText.jsx';
import OptionsGraphPanel from 'components/OptionsGraphPanel.jsx';

const URL = 'ws://localhost:8080';
const ws = new WebSocket(URL);

function App() {
	const [ entriesData, setEntriesData ] = useState([]);
	const [ filterOptions, setFilterOptions ] = useState({
		type: null,
		date: new Date().toISOString()
	});
	const [ displayOptions, setDisplayOptions ] = useState({
		visibility: {
			start: false,
			encore: true,
			graph: 'week'
		}
	});
	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 24,
		twelveHourClock: true,
		hourWidth: 5
	});

	ws.onmessage = (e) => {
		const data = JSON.parse(e.data);
		const entries = data.entries;
		setEntriesData(entries);
	};

	function filterEntries(entries) {
		return entries.filter((el) => {
			if (el.date.substring(0, 10) === filterOptions.date.substring(0, 10)) return true;
			else return false;
		});
	}

	const appContainerStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridTemplateRows: 'auto auto auto auto',
		gridRowGap: '.5rem',
		padding: '1rem 2.5rem'
	};

	return (
		<div className="App" style={{ padding: '1rem' }}>
			<div style={appContainerStyle}>
				<TopPageText entriesData={entriesData} filterOptions={filterOptions} />
				<DayTimeline
					entries={filterEntries(entriesData)}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
					displayOptions={displayOptions}
					timeOptions={timeOptions}
				/>
				<OptionsGraphPanel
					entriesData={entriesData}
					setEntriesData={setEntriesData}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					displayOptions={displayOptions}
					setDisplayOptions={setDisplayOptions}
					timeOptions={timeOptions}
					setTimeOptions={setTimeOptions}
				/>
			</div>
		</div>
	);
}

export default App;
