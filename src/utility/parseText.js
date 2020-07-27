export const capitalizeFirstLetter = (str) => checkIfStr(str)[0].toUpperCase() + checkIfStr(str).slice(1);
const splitCamelCase = (str) => checkIfStr(str).split(/(?=[A-Z])/);
const checkIfStr = (str) => (typeof str === 'string' && str.length > 0 ? str : 'ERROR');

export const convertObjectKeyRouteToTitleCase = (str) => {
	let words = str.split(' ').map((el) => capitalizeFirstLetter(el));
	return splitCamelCase(words.join('')).join(' ');
};
