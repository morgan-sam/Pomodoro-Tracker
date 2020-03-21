import React, { useEffect, useState } from 'react';

const URL = 'ws://localhost:8080';

const ws = new WebSocket(URL);

function App() {
	const [ appText, setText ] = useState('No data from server');
	const [ message, setMessage ] = useState('No data from server');

	ws.onmessage = (e) => {
		setMessage(e.data);
	};

	useEffect(
		() => {
			setText(message);
		},
		[ message ]
	);

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
