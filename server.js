const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const db = require('./config/queries');

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (request, response) => {
	response.json({ info: 'This is a server to store pomodoro entries. The database can be found at /entries' });
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

app.get('/entries', db.getEntries);
app.get('/entries/:id', db.getEntryById);
app.post('/entries', db.createEntry);
app.put('entries/:id', db.updateEntry);
app.delete('/entries/:id', db.deleteEntry);
