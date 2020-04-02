import React, { useState, useEffect } from 'react';
import DayTimeline from './DayTimeline';
import TopPageText from 'components/TopPageText.jsx';
import OptionsGraphPanel from 'components/OptionsGraphPanel.jsx';
import axios from 'axios';
import { convertUTCISOToUKObj } from 'utility/parseDates';

function App() {
	const [ entriesData, setEntriesData ] = useState([]);
	const [ filterOptions, setFilterOptions ] = useState({
		type: null,
		date: new Date().toISOString()
	});
	const [ displayOptions, setDisplayOptions ] = useState({
		timeline: {
			start: false,
			encore: true
		},
		graph: {
			period: 'week passed',
			type: 'both',
			maxPomodoro: 14
		}
	});
	const [ timeOptions, setTimeOptions ] = useState({
		startTime: 8,
		endTime: 24,
		twelveHourClock: true,
		hourWidth: 5
	});

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

	useEffect(() => {
		(async () => {
			const res = await axios.get('http://localhost:8000/api/entries/');
			const correctTimeZoneData = res.data.map((el) => {
				return {
					type: el.type,
					date: convertUTCISOToUKObj(el.date)
				};
			});
			console.log(correctTimeZoneData);
			setEntriesData(res.data);
		})();
	}, []);

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
					displayOptions={displayOptions.timeline}
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
