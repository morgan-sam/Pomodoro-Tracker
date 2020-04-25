const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/queries');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
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
