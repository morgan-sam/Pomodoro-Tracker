import React, { useState, useEffect } from 'react';
import TopPanel from 'components/TopPanel';
import BottomPanel from 'components/BottomPanel';
import { getAutoHourWidth } from 'utility/calculateSizing';
import { compareObjs } from 'utility/sortAndCompare';
import { convertUTCISOToUKObj } from 'utility/parseDates';
import { appContainerStyle, panelContainerStyle } from 'styles/app';

function App() {
	const [ entriesData, setEntriesData ] = useState([]);
	const [ todaysCommits, setTodaysCommits ] = useState(null);
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
			visible: true,
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
				const todaysCommits = await getTodaysGithubCommits();
				setTodaysCommits(todaysCommits);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const getTodaysGithubCommits = async () => {
		const events = await fetch('https://api.github.com/users/morgan-sam/events?per_page=100', {
			headers: new Headers({
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
			})
		}).then((response) => response.json());
		const today = new Date().toISOString().substring(0, 10);
		const todayEvents = events.filter((el) => el.created_at.substring(0, 10) === today);
		const commitsTotal = todayEvents.reduce((total, el) => {
			return el.payload.commits.length + total;
		}, 0);
		return commitsTotal;
	};

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

	const optionProps = {
		filterOptions,
		setFilterOptions,
		timeOptions,
		setTimeOptions,
		displayOptions,
		setDisplayOptions
	};

	return (
		<div className="App" style={appContainerStyle}>
			<div style={panelContainerStyle}>
				<TopPanel
					filteredEntries={filterEntries(entriesData)}
					todaysCommits={todaysCommits}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
					{...optionProps}
				/>
				<BottomPanel entriesData={entriesData} {...optionProps} />
			</div>
		</div>
	);
}

export default App;
