import React, { useEffect, useState } from 'react';

const URL = 'ws://localhost:8080';

const ws = new WebSocket(URL);

function App() {
	const [ appText, setText ] = useState('No data from server');

	async function getServerText() {
		const url = 'http://localhost:8000/';
		const response = await fetch(url);
		return response;
	}

	useEffect(
		() => {
			async function setAppText() {
				const text = await getServerText();
				const json = await text.json();
				setText(JSON.stringify(json, null, 4));
			}
			setAppText();
		},
		[ appText ]
	);

	useEffect(() => {
		ws.onmessage = (evt) => {
			// on receiving a message, add it to the list of messages
			const message = JSON.parse(evt.data);
			setText(message);
		};
	}, []);

	return (
		<div className="App">
			{appText}
			{<br />}
			{<br />}
			{<br />}
			<button
				style={{ height: '3rem', width: '7rem' }}
				onClick={() => {
					ws.send(JSON.stringify('The quick brown fox jumps over the lazy dog'));
				}}
			>
				Send msg to WS Server
			</button>
		</div>
	);
}

export default App;
