import firebase from 'firebase';

var config = {
	apiKey: process.env.FIREBASE_KEY,
	authDomain: process.env.FIREBASE_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

firebase.initializeApp(config);
