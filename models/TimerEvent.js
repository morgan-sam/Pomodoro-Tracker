const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerEventSchema = new Schema({
	type: String,
	date: String
});

const TimerEvent = mongoose.model('timerEvent', TimerEventSchema);

module.exports = TimerEvent;
