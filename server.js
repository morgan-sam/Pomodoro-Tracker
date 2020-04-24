const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/queries');

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening...`);
});

app.get('/entries', db.getEntries);
app.get('/entries/:id', db.getEntryById);
app.post('/entries', db.createEntry);
app.put('entries/:id', db.updateEntry);
app.delete('/entries/:id', db.deleteEntry);
