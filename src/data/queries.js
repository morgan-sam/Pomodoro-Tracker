import firebase from 'config/firebase';

export const getEntries = async () => {
	return firebase.database().ref('/users/').once('value').then((snapshot) => {
		const raw = snapshot.val();
		const values = Object.values(raw[firebase.auth().currentUser.uid].events);
		return values;
	});
};

export const deleteAllEntries = async () => {
	return firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).remove();
};

export const printCurrentUser = async () => {
	console.log(firebase.auth().currentUser.uid);
};
