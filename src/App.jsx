import React, { useEffect, useState } from 'react';

const URL = 'ws://localhost:8080';

const ws = new WebSocket(URL);

function App() {
	const [ appText, setText ] = useState('No data from server');
	const [ entriesData, setEntriesData ] = useState('No data from server');
	const [ filterOptions, setFilterOptions ] = useState({
		type: null,
		date: new Date().toISOString().substring(0, 10)
	});

	ws.onmessage = (e) => {
		const data = JSON.parse(e.data);
		const entries = data.entries;
		setEntriesData(entries);
	};

	useEffect(
		() => {
			setText(JSON.stringify(entriesData));
		},
		[ entriesData ]
	);

	return (
		<div className="App">
			{appText}
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
						...filterOptions,
						date: new Date(Date.parse(filterOptions.date) + 1 * 86400000).toISOString().substring(0, 10)
					})}
			>
				Tomorrow
			</button>
		</div>
	);
}

export default App;
