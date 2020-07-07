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
	updateEntry,
	deleteEntry
};
