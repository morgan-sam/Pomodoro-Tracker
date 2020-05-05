import React, { useState, useEffect } from 'react';
import TopPanel from 'components/TopPanel';
import BottomPanel from 'components/BottomPanel';
import { getAutoHourWidth } from 'utility/calculateSizing';
import { compareObjs } from 'utility/sortAndCompare';
import { convertUTCISOToUKObj } from 'utility/parseDates';
import { appContainerStyle, panelContainerStyle } from 'styles/app';

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
		hourWidth: 5
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
				const raw = await fetch('/entries');
				const json = await raw.json();
				const correctedTimezoneData = convertDataToUKTimezone(json);
				setEntriesData(correctedTimezoneData);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	useEffect(() => {
		const localDisplayOptions = JSON.parse(window.localStorage.getItem('displayOptions'));
		if (localDisplayOptions) setDisplayOptions(localDisplayOptions);
		setTimelineToFitWindow();
	}, []);

	useEffect(() => {
		window.addEventListener('resize', setTimelineToFitWindow);
		return () => {
			window.removeEventListener('resize', setTimelineToFitWindow);
		};
	});

	useEffect(
		() => {
			window.localStorage.setItem('displayOptions', JSON.stringify(displayOptions));
		},
		[ displayOptions ]
	);

	const setTimelineToFitWindow = () => {
		setTimeOptions({ ...timeOptions, hourWidth: getAutoHourWidth(timeOptions) });
	};

	return (
		<div className="App" style={appContainerStyle}>
			<div style={panelContainerStyle}>
				<TopPanel
					filteredEntries={filterEntries(entriesData)}
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
				/>
			</div>
		</div>
	);
}

export default App;
