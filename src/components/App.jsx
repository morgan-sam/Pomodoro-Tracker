import React, { useEffect, useState } from 'react';
import BounceButton from './BounceButton';
import DayTimeline from './DayTimeline';
import TimelineToggles from 'components/TimelineToggles';
import TimeOptionSelect from 'components/TimeOptionSelect.jsx';
import DateNavigation from 'components/DateNavigation';
import { parseISOToLittleEndian } from 'utility/parseDates';

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

	function getEventCountForDay(event, date) {
		return entriesData.filter((el) => el.type === event && el.date.substring(0, 10) === date.substring(0, 10))
			.length;
	}

	const appContainerStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridTemplateRows: 'auto auto auto auto',
		gridRowGap: '3.5rem'
	};

	return (
		<div className="App" style={{ padding: '1rem' }}>
			<div style={appContainerStyle}>
				<div>
					<h1>
						Pomodoros for {parseISOToLittleEndian(filterOptions.date).replace(new RegExp('/', 'g'), '-')}
					</h1>
					<h3>
						Total{' '}
						{filterOptions.date.substring(0, 10) === new Date().toISOString().substring(0, 10) ? (
							'for today'
						) : (
							''
						)}:{' '}
					</h3>
					<h2>Pomodoros: {getEventCountForDay('pomodoro', filterOptions.date)}</h2>
				</div>
				<DayTimeline
					entries={filterEntries(entriesData)}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
					displayOptions={displayOptions}
					timeOptions={timeOptions}
				/>
				<DateNavigation filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
				<TimeOptionSelect timeOptions={timeOptions} setTimeOptions={setTimeOptions} />
				<TimelineToggles setDisplayOptions={setDisplayOptions} displayOptions={displayOptions} />
			</div>
		</div>
	);
}

export default App;
