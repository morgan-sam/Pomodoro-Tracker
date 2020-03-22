const express = require('express');
const fs = require('fs');
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

app.post('/api', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end();
	addEntryToFile({ type: request.body.type, date: request.body.date });
});

//Only emits event once connection is established
wss.on('connection', (ws) => {
	eventEmitter.on('sendEntryEvent', () => {
		fs.readFile('./record.json', 'utf8', function(err, data) {
			if (err) throw err;
			ws.send(data);
			console.log('Sent entries to client');
		});
	});
});

function addEntryToFile(entryObj) {
	fs.readFile('./record.json', 'utf-8', function(err, data) {
		if (err) {
			fs.writeFile('./record.json', '{"entries":[]}', 'utf-8', function(err) {
				if (err) throw err;
				console.log('Created new record file!');
			});
		}
		let entriesObjectArray = data ? JSON.parse(data) : { entries: [] };
		entriesObjectArray.entries.push(entryObj);
		fs.writeFile('./record.json', JSON.stringify(entriesObjectArray, null, 4), 'utf-8', function(err) {
			if (err) throw err;
			console.log('Done!');
			eventEmitter.emit('sendEntryEvent');
		});
	});
}
