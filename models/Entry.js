const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerEventSchema = new Schema({
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const TimerEvent = mongoose.model('timerEvent', TimerEventSchema);

module.exports = TimerEvent;
