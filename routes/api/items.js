const express = require('express');
const router = express.Router();

const Entry = require('../../models/Entry');

// @route   GET api/entries
// @desc    Get All Entries
// @access  Public
router.get('/', async (req, res) => {
	try {
		const data = await Entry.findAll();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
		res.status(500).send(error);
	}
});

// @route   POST api/entries
// @desc    Created An Entry
// @access  Public
router.post('/', async (req, res) => {
	try {
		const newEntry = new Entry({
			type: req.body.type
		});

		const data = await newEntry.save();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/entries/:id
// @desc    Delete An Entry
// @access  Public
router.delete('/:id', async (req, res) => {
	try {
		const data = await Entry.findById(req.params.id);
		await data.remove();
		res.json({ success: true });
	} catch (err) {
		console.error(err.message);
		res.status(404).json({ success: false });
	}
});

module.exports = router;
