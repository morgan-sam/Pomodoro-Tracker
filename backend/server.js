const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

let words;
fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err;
	words = data;
});

app.get('/', (req, res) => res.send(words));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
