import React, { useEffect, useState } from 'react';
import DayTimeline from './DayTimeline';
import TimelineToggles from 'components/TimelineToggles';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import DateNavigation from 'components/DateNavigation';

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
			encore: true
		}
	});
	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 20,
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

	return (
		<div className="App" style={{ padding: '1rem' }}>
			<DayTimeline
				entries={filterEntries(entriesData)}
				eventLengths={{
					pomodoro: 25,
					encore: 5
				}}
				displayOptions={displayOptions}
				timeOptions={timeOptions}
			/>
			<br />
			<br />
			<DateNavigation filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
			<br />
			<TimeOptionSelect timeOptions={timeOptions} setTimeOptions={setTimeOptions} />
			<br />
			<TimelineToggles setDisplayOptions={setDisplayOptions} displayOptions={displayOptions} />
		</div>
	);
}

export default App;
