const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/queries');

var serveStatic = require('serve-static');

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());
app.use(serveStatic(path.join(__dirname, 'dist')));

app.get('/', (request, response) => {
	response.json({ info: 'This is a server to store pomodoro entries. The database can be found at /entries' });
});

app.listen(process.env.port || 8000, () => {
	console.log(`Server listening...`);
});

app.get('/entries', db.getEntries);
app.get('/entries/:id', db.getEntryById);
app.post('/entries', db.createEntry);
app.put('entries/:id', db.updateEntry);
app.delete('/entries/:id', db.deleteEntry);
