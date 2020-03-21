const express = require('express');
var cors = require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const entries = [];

app.post('/api', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end();
	const data = { event: request.body.event, date: request.body.date };
	entries.push(data);
	eventEmitter.emit('sendEntryEvent');
});

//Only emits event once connection is established
wss.on('connection', (ws) => {
	eventEmitter.on('sendEntryEvent', () => {
		ws.send(JSON.stringify(entries));
		console.log('Sent entry to client');
	});
});
