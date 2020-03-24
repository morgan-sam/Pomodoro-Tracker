import React, { useEffect, useState } from 'react';
import DayTimeline from './DayTimeline';

const URL = 'ws://localhost:8080';

const ws = new WebSocket(URL);

function App() {
	const [ entriesData, setEntriesData ] = useState([]);
	const [ filterOptions, setFilterOptions ] = useState({
		type: null,
		date: new Date().toISOString().substring(0, 10)
	});
	const [ displayOptions, setDisplayOptions ] = useState({
		visibility: {
			start: false,
			encore: true
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
			if (el.date.substring(0, 10) === filterOptions.date) return true;
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
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					setFilterOptions({
						...filterOptions,
						date: new Date(Date.parse(filterOptions.date) - 1 * 86400000).toISOString().substring(0, 10)
					})}
			>
				Yesterday
			</button>
			<span style={{ padding: '2rem', width: '10rem' }}>Selected Date: {filterOptions.date}</span>
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					setFilterOptions({
						...displayOptions,
						date: new Date(Date.parse(filterOptions.date) + 1 * 86400000).toISOString().substring(0, 10)
					})}
			>
				Tomorrow
			</button>
			<br />
			<br />
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					setDisplayOptions({
						...displayOptions,
						visibility: {
							...displayOptions.visibility,
							start: !displayOptions.visibility.start
						}
					})}
			>
				Turn {displayOptions.visibility.start ? 'Off' : 'On'} Start Markers
			</button>
			{'	'}
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					setDisplayOptions({
						...displayOptions,
						visibility: {
							...displayOptions.visibility,
							encore: !displayOptions.visibility.encore
						}
					})}
			>
				Turn {displayOptions.visibility.encore ? 'Off' : 'On'} Encores
			</button>
			{'	'}
			<button
				style={{ height: '2rem', width: '10rem' }}
				onClick={() =>
					setDisplayOptions({
						...displayOptions,
						visibility: {
							...displayOptions.visibility,
							grid: !displayOptions.visibility.grid
						}
					})}
			>
				Turn {displayOptions.visibility.grid ? 'Off' : 'On'} Grid
			</button>
		</div>
	);
}

export default App;
