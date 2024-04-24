import firebase from "config/firebase";
import firebaseApp from "firebase/compat/app";

export const getAllData = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .once("value")
      .then((snapshot) => {
        const raw = snapshot.val();
        return raw ? raw : {};
      });
};

export const getEntries = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/events")
      .once("value")
      .then((snapshot) => {
        const raw = snapshot.val();
        return raw ? raw : {};
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

export const getMoneyData = async () => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/money_data")
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

export const updateOutreachData = async (dateString, emailCount) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/outreach_data/")
      .update({
        [dateString]: emailCount,
      });
};

export const updateApplicationsData = async (dateString, applicationCount) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/applications_data")
      .update({ [dateString]: applicationCount });
};

export const updateMoneyData = async (dateString, moneyCount) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/money_data")
      .update({ [dateString]: moneyCount });
};

export const updateHabitsData = async (dateString, habitsData) => {
  if (firebase.auth().currentUser)
    return firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid + "/habits_data")
      .update({ [dateString]: habitsData });
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
