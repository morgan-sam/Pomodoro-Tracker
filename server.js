const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const items = require('./routes/api/items');
const db = require('./config/keys').mongodURI;
const app = express();

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use('/api/entries', items);

if (process.env.NODE_ENV === 'productive') {
	app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
