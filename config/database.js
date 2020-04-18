const Sequelize = require('sequelize');

module.exports = new Sequelize('pomodorodb', 'postgres', '123456', {
	host: 'localhost',
	dialect: 'postgres',
	operatirsAliases: false,

	pool: {
		max: 5,
		min: 0,
		aqcquire: 30000,
		idle: 10000
	}
});
