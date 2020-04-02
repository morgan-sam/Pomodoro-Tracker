const express = require('express');
const router = express.Router();

const Entry = require('../../models/Entry');

// @route   GET api/entries
// @desc    Get All Entries
// @access  Public
router.get('/', async (req, res) => {
	try {
		const data = await Entry.find().sort({ date: -1 });
		res.json(data);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route   POST api/entries
// @desc    Created A Post
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

module.exports = router;
