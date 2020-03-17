import React, { useEffect, useState } from 'react';

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
				setText(json);
			}
			setAppText();
		},
		[ appText ]
	);

	return (
		<div className="App">
			{appText}
			<button onClick={() => null} />
		</div>
	);
}

export default App;
