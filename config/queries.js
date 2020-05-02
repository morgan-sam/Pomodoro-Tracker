const { pool } = require('./pool');

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
	let { type, date } = request.body;
	console.log(date);
	if (date === null) date = new Date().toISOString();
	pool.query('INSERT INTO entries (type, date) VALUES ($1, $2) RETURNING *', [ type, date ], (error, results) => {
		if (error) throw error;
		response.status(201).send(`Entry added with ID: ${results.rows[0].id}\n`);
	});
};

const updateEntry = (request, response) => {
	const id = parseInt(request.params.id);
	const { type } = request.body;
	pool.query('UPDATE entries SET type = $1 WHERE id = $2', [ type, id ], (error, results) => {
		if (error) throw error;
		response.status(200).send(`Entry modified with ID: ${id}\n`);
	});
};

const deleteEntry = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query('DELETE FROM entries WHERE id = $1', [ id ], (error, results) => {
		if (error) throw error;
		response.status(200).send(`Entry deleted with ID: ${id}\n`);
	});
};

module.exports = {
	getEntries,
	getEntryById,
	createEntry,
	updateEntry,
	deleteEntry
};
