const express = require('express');
const fs = require('fs');
var cors = require('cors');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var entries = [];

app.use(cors());

let words;
fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err;
	words = data;
});

app.get('/', (req, res) => res.send(JSON.stringify(words)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/api', function(request, response) {
	entries[entries.length] = { type: request.body.type, date: request.body.date };
	response.writeHead(201, { Location: entries.length });
	response.end();
	console.log(entries);
});
