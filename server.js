const express = require('express');
const cors = require('cors');

const keys = require('./config/keys');

const items = require('./routes/api/items');
const app = express();

const db = require('./config/database');
db.authenticate().then(() => console.log('Database connected')).catch((err) => console.log('Error ' + err));

const port = process.env.PORT || 5432;
app.use(cors());
app.use(express.json());
app.use('/api/entries', items);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
} else {
	app.use(keys.URI);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.get('/', (req, res) => res.send('Hello World!\n'));
