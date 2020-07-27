export const capitalizeFirstLetter = (str) => checkIfStr(str)[0].toUpperCase() + checkIfStr(str).slice(1);
const splitCamelCase = (str) => checkIfStr(str).split(/(?=[A-Z])/).join(' ');
export const convertCamelToCapital = (str) => capitalizeFirstLetter(splitCamelCase(str));
const checkIfStr = (str) => (typeof str === 'string' && str.length > 0 ? str : 'ERROR');
