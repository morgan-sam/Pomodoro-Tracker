const express = require('express');
const fs = require('fs');
var cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());

let words;
fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err;
	words = data;
});

app.get('/', (req, res) => res.send(JSON.stringify(words)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
