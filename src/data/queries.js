import firebase from 'config/firebase';
import firebaseApp from 'firebase/app';

export const getEntries = async () => {
	return firebase.database().ref('/users/').once('value').then((snapshot) => {
		const raw = snapshot.val();
		const values = Object.values(raw[firebase.auth().currentUser.uid].events);
		return values;
	});
};

export const reauthenticate = async (password) => {
	const user = firebase.auth().currentUser;
	const credential = firebaseApp.auth.EmailAuthProvider.credential(user.email, password);
	try {
		await user.reauthenticateWithCredential(credential);
		return true;
	} catch (error) {
		return false;
	}
};

export const changePassword = async (newPassword) => {
	const user = firebase.auth().currentUser;
	return user.updatePassword(newPassword);
};

export const changeEmail = async (newEmail) => {
	const user = firebase.auth().currentUser;
	return user.updateEmail(newEmail);
};

export const deleteAllEntries = async () => {
	return firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).remove();
};

export const deleteAccount = async () => {
	return firebase.auth().currentUser.delete();
};
