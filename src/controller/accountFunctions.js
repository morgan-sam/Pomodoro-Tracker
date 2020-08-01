import { changePassword, changeEmail, deleteAllEntries, deleteAccount } from 'data/queries';

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

export const accountFunctionTemplates = {
	changePassword: changePasswordTemplate,
	changeEmail: changeEmailTemplate,
	resetAccount: resetAccountTemplate,
	deleteAccount: deleteAccountTemplate
};
