import { reauthenticate, changePassword, changeEmail, deleteAllEntries, deleteAccount } from 'data/queries';

const userCheckPassword = async (passwordMsg) => {
	const password = prompt(passwordMsg);
	if (password) return await reauthenticate(password);
	else return false;
};

const accountFunction = async (obj) => {
	const { confirmMsg, passwordMsg, inputMsg, action } = obj;
	const confirmed = confirmMsg ? window.confirm(confirmMsg) : true;
	if (!confirmed) return null;
	const auth = passwordMsg ? await userCheckPassword(passwordMsg) : true;
	if (!auth) return alert('Incorrect Password');
	const input = inputMsg ? window.prompt(inputMsg) : false;
	return input ? action(input) : action();
};

const changePasswordTemplate = {
	confirmMsg: '',
	passwordMsg: 'Please enter your current password:',
	inputMsg: 'Please enter your new password:',
	action: changePassword
};

const changeEmailTemplate = {
	confirmMsg: '',
	passwordMsg: 'Please enter your password:',
	inputMsg: 'Please enter the new email you would like to use:',
	action: changeEmail
};

const resetAccountTemplate = {
	confirmMsg: 'Are you sure you want to reset your account? This will delete all pomodoro entries.',
	passwordMsg: 'Please enter your password to reset your account:',
	inputMsg: '',
	action: deleteAllEntries
};

const deleteAccountTemplate = {
	confirmMsg: 'Are you sure you want to delete your account? (THIS CANNOT BE UNDONE)',
	passwordMsg: 'Please enter your password to PERMANENTLY DELETE your account:',
	inputMsg: '',
	action: deleteAccount
};

export const accountFunctions = {
	changePassword: () => accountFunction(changePasswordTemplate),
	changeEmail: () => accountFunction(changeEmailTemplate),
	resetAccount: () => accountFunction(resetAccountTemplate),
	deleteAccount: () => accountFunction(deleteAccountTemplate)
};
