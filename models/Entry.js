const Sequelize = require('sequelize');
const db = require('../config/database');

const entry = db.define(
	'entry',
	{
		type: {
			type: Sequelize.STRING
		},
		date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
	},
	{
		timestamps: false
	}
);

module.exports = entry;
