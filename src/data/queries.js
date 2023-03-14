import firebase from "config/firebase";
import firebaseApp from "firebase/compat/app";

export const getEntries = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        const raw = snapshot.val();
        const values = Object.values(raw.events);
        return values;
      });
};

export const getOutreachData = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/outreach_data")
      .once("value")
      .then((snapshot) => {
        const raw = snapshot.val();
        return raw ? raw : {};
      });
};

export const getOptions = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/settings")
      .once("value")
      .then((snapshot) => snapshot.val());
};

export const postOptions = async (options) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/settings")
      .set(options);
};

export const postOutreachData = async (emailCount) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/outreach_data")
      .set(emailCount);
};

export const reauthenticate = async (password) => {
  const user = firebase.auth().currentUser;
  const credential = firebaseApp.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  try {
    await user.reauthenticateWithCredential(credential);
    return true;
  } catch (error) {
    return false;
  }
};

export const changePassword = async (newPassword) => {
  const user = firebase.auth().currentUser;
  try {
    user.updatePassword(newPassword);
    return "Successfully changed password";
  } catch (error) {
    return "Failed to change password";
  }
};

export const changeEmail = async (newEmail) => {
  const user = firebase.auth().currentUser;
  try {
    user.updateEmail(newEmail);
    return "Successfully changed email";
  } catch (error) {
    return "Failed to change email";
  }
};

export const deleteAllEntries = async () => {
  try {
    firebase
      .database()
      .ref(`/users/${firebase.auth().currentUser.uid}`)
      .remove();
    return "Successfully reset all entries";
  } catch (error) {
    return "Failed to reset all entries";
  }
};

export const deleteAccount = async () => {
  return firebase.auth().currentUser.delete();
};