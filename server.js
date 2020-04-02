const mongoose = require('mongoose');
const express = require('express');

const items = require('./routes/api/items');
const db = require('./config/keys').mongodURI;
const app = express();

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const port = process.env.PORT || 8000;
app.use(express.json());
app.use('/api/entries', items);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
