const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb://localhost/pomodoroDatabase', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const TimerEvent = require('../models/TimerEvent');

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/api', async (request, response) => {
	await TimerEvent.create({ type: request.body.type, date: request.body.date });
});
