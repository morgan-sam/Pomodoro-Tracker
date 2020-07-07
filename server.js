const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const firebase = require('./config/firebase').firebaseApp;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening...`);
});

const db = firebase.database();
const data = db.ref('/users');
data.on('value', (snapshot) => {
	const raw = snapshot.val();
	const values = Object.values(raw[23456789].events);
	console.log(values);
});
