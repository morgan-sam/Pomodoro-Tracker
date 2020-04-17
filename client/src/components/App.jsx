import React, { useState, useEffect } from 'react';
import TopPanel from 'components/TopPanel';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';

import { getAutoHourWidth } from 'utility/calculateSizing';
import { compareObjs } from 'utility/sortAndCompare';
import axios from 'axios';

import { getDateHourOffset, convertUTCISOToUKObj } from 'utility/parseDates';
import BottomPanel from './BottomPanel';

function App() {
	const [ entriesData, setEntriesData ] = useState([]);
	const [ filterOptions, setFilterOptions ] = useState({
		type: null,
		date: convertUTCISOToUKObj(new Date().toISOString()).date
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
		hourWidth: 5,
		offset: getDateHourOffset(),
		autoAdjust: true
	});

	function filterEntries(entries) {
		return entries.filter((el) => {
			if (compareObjs(el.date, filterOptions.date)) return true;
			else return false;
		});
	}

	function convertDataToUKTimezone(data) {
		return data.map((el) => {
			const { date, time } = convertUTCISOToUKObj(el.date);
			return {
				id: el._id,
				type: el.type,
				date,
				time
			};
		});
	}

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('http://localhost:8000/api/entries/');
				const correctedTimezoneData = convertDataToUKTimezone(res.data);
				setEntriesData(correctedTimezoneData);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		setTimelineToFitWindow();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', setTimelineToFitWindow);
		return () => {
			window.removeEventListener('resize', setTimelineToFitWindow);
		};
	});

	const setTimelineToFitWindow = () => {
		setTimeOptions({ ...timeOptions, hourWidth: getAutoHourWidth(timeOptions) });
	};

	const appContainerStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		height: '100vh',
		width: '100vw'
	};

	const panelContainerStyle = {
		height: '100%',
		width: '100%',
		boxSizing: 'border-box',
		padding: '4rem'
	};

	return (
		<div className="App" style={appContainerStyle}>
			<div style={panelContainerStyle}>
				<TopPanel
					filteredEntries={filterEntries(entriesData)}
					filterOptions={filterOptions}
					displayOptions={displayOptions}
					timeOptions={timeOptions}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					timeOptions={timeOptions}
					setTimeOptions={setTimeOptions}
					displayOptions={displayOptions}
					setDisplayOptions={setDisplayOptions}
				/>
				<BottomPanel
					entriesData={entriesData}
					setEntriesData={setEntriesData}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					timeOptions={timeOptions}
					setTimeOptions={setTimeOptions}
					displayOptions={displayOptions}
					setDisplayOptions={setDisplayOptions}
					displayOptions={displayOptions}
				/>
			</div>
		</div>
	);
}

export default App;
