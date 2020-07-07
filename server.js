const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const firebaseApp = require('./config/firebase');

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening...`);
});

console.log(firebaseApp);
