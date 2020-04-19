const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'pomodorodb',
	password: '123456',
	port: '5432'
});

const getEntries = (request, response) => {
	pool.query('SELECT * FROM entries ORDER BY id ASC', (error, results) => {
		if (error) throw error;
		response.status(200).json(results.rows);
	});
};

const getEntryById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query('SELECT * FROM entries WHERE id = $1', [ id ], (error, results) => {
		if (error) throw error;
		response.status(200).json(results.rows);
	});
};

const createEntry = (request, response) => {
	const { type } = request.body;
	const date = new Date().toISOString();
	pool.query('INSERT INTO entries (type,date ) VALUES ($1, $2) RETURNING *', [ type, date ], (error, results) => {
		if (error) throw error;
		response.status(201).send(`Entry added with ID: ${results.rows[0].id}`);
	});
};

const updateEntry = (request, response) => {
	const id = parseInt(request.params.id);
	const { type } = request.body;
	pool.query('UPDATE entries SET type = $1 WHERE id = $2', [ type, id ], (error, results) => {
		if (error) throw error;
		response.status(200).send(`Entry modified with ID: ${id}`);
	});
};

const deleteEntry = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query('DELETE FROM entries WHERE id = $1', [ id ], (error, results) => {
		if (error) throw error;
		response.status(200).send(`Entry deleted with ID: ${id}`);
	});
};

module.exports = {
	getEntries,
	getEntryById,
	createEntry,
	updateEntry,
	deleteEntry
};
