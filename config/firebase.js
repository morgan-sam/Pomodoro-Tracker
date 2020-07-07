const firebase = require('firebase');
require('dotenv').config();

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

module.exports = {
	firebaseApp
};
