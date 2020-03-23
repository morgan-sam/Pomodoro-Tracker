import React, { useEffect, useState } from 'react';

const URL = 'ws://localhost:8080';

const ws = new WebSocket(URL);

function App() {
	const [ appText, setText ] = useState('No data from server');
	const [ entriesData, setEntriesData ] = useState('No data from server');

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

	return <div className="App">{appText}</div>;
}

export default App;
