const Sequelize = require('sequelize');

module.exports = new Sequelize(
	'd5q0393mpjgvvk',
	'oydowpgwepmfmp',
	'195958def3d4e4687a4a3bfc59b70276a0973f3f127fdf905cbc4c02fcf71329',
	{
		host: 'ec2-18-233-137-77.compute-1.amazonaws.com',
		dialect: 'postgres',
		operatirsAliases: false,

		pool: {
			max: 5,
			min: 0,
			aqcquire: 30000,
			idle: 10000
		}
	}
);
