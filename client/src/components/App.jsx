import React, { useState, useEffect } from 'react';
import TopPanel from 'components/TopPanel';
import OptionsPanel from 'components/OptionsPanel';
import GraphPanel from 'components/GraphPanel';

import { getAutoHourWidth } from 'utility/calculateSizing';
import axios from 'axios';

import { getDateHourOffset, convertUTCISOToUKDateOnly } from 'utility/parseDates';

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
		hourWidth: 5,
		offset: getDateHourOffset(),
		autoAdjust: true
	});

	function filterEntries(entries) {
		return entries.filter((el) => {
			if (convertUTCISOToUKDateOnly(el.date) === convertUTCISOToUKDateOnly(filterOptions.date)) return true;
			else return false;
		});
	}

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('http://localhost:8000/api/entries/');
				setEntriesData(res.data);
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
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(2, 1fr)',
		boxSizing: 'border-box',
		padding: '4rem'
	};

	const topHalf = {
		gridArea: '1 / 1 / 2 / 3'
	};
	const bottomLeft = {
		gridArea: '2 / 1 / 3 / 2'
	};
	const bottomRight = {
		gridArea: '2 / 2 / 3 / 3',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	};

	return (
		<div className="App" style={appContainerStyle}>
			<div style={panelContainerStyle}>
				<TopPanel
					style={topHalf}
					filteredEntries={filterEntries(entriesData)}
					filterOptions={filterOptions}
					displayOptions={displayOptions}
					timeOptions={timeOptions}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
				/>
				<OptionsPanel
					style={bottomLeft}
					entriesData={entriesData}
					setEntriesData={setEntriesData}
					filterOptions={filterOptions}
					setFilterOptions={setFilterOptions}
					displayOptions={displayOptions}
					setDisplayOptions={setDisplayOptions}
					timeOptions={timeOptions}
					setTimeOptions={setTimeOptions}
				/>
				<GraphPanel
					style={bottomRight}
					entriesData={entriesData}
					filterOptions={filterOptions}
					displayOptions={displayOptions}
				/>
			</div>
		</div>
	);
}

export default App;
