import React, { useState, useEffect } from 'react';
import TopPanel from 'components/TopPanel';
import TopRightButtons from 'components/TopRightButtons';
import BottomPanel from 'components/BottomPanel';
import { getAutoHourWidth } from 'utility/calculateSizing';
import { compareObjs } from 'utility/sortAndCompare';
import { convertUTCISOToUKObj } from 'utility/parseDates';
import { getAppContainerStyle } from 'styles/app';
import { getEntries, postOptions, getOptions } from 'data/queries';

function Main(props) {
	const { options, setOptions } = props;
	const [ entriesData, setEntriesData ] = useState([]);
	const [ todaysCommits, setTodaysCommits ] = useState(null);
	const [ date, setDate ] = useState(convertUTCISOToUKObj(new Date().toISOString()).date);
	const [ hourWidth, setHourWidth ] = useState(getAutoHourWidth(options.timeline));

	function filterEntries(entries) {
		return entries.filter((el) => {
			if (compareObjs(el.date, date)) return true;
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
				const entries = await getEntries();
				const correctedTimezoneData = convertDataToUKTimezone(entries);
				setEntriesData(correctedTimezoneData);
				// const todaysCommits = await getTodaysGithubCommits();
				// setTodaysCommits(todaysCommits);
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
		const getOptionsFromDatabase = async () => {
			const databaseOptions = await getOptions();
			if (databaseOptions) setOptions(databaseOptions);
		};
		getOptionsFromDatabase();
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
			const setDatabaseOptions = async () => {
				const databaseOptions = await getOptions();
				if (JSON.stringify(options) !== JSON.stringify(databaseOptions)) postOptions(options);
			};
			setDatabaseOptions();
		},
		[ options ]
	);

	const setTimelineToFitWindow = () => {
		setHourWidth(getAutoHourWidth(options.timeline));
	};

	const optionProps = {
		date,
		setDate,
		options,
		setOptions
	};
	return (
		<div className="App" style={getAppContainerStyle(options.darkTheme)}>
			<div className={'main-container'}>
				<TopPanel
					filteredEntries={filterEntries(entriesData)}
					todaysCommits={todaysCommits}
					hourWidth={hourWidth}
					eventLengths={{
						pomodoro: 25,
						encore: 5
					}}
					{...optionProps}
				/>
				<TopRightButtons />
				{options.graph.visible && <BottomPanel entriesData={entriesData} {...optionProps} />}
			</div>
		</div>
	);
}

export default Main;
