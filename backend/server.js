const express = require('express');
const fs = require('fs');
var cors = require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

let words;
fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err;
	words = data;
});

app.get('/', (req, res) => res.send(JSON.stringify(words)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/api', function(request, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.end();
	addEntryToFile(request.body.event, request.body.date);
});

function addEntryToFile(event, date) {
	fs.readFile('./record.json', 'utf-8', function(err, data) {
		if (err) throw err;

		var entriesObjectArray = JSON.parse(data);
		entriesObjectArray.entries.push({
			event,
			date
		});
		fs.writeFile('./record.json', JSON.stringify(entriesObjectArray, null, 4), 'utf-8', function(err) {
			if (err) throw err;
			console.log('Done!');
		});
	});
}
