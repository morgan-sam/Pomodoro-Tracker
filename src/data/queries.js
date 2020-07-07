import firebase from 'config/firebase';

export const getEntries = async () => {
	return firebase.database().ref('/users/').once('value').then((snapshot) => {
		const raw = snapshot.val();
		const values = Object.values(raw[23456789].events);
		return values;
	});
};
