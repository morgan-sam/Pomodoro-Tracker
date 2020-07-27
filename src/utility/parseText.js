export const capitalizeFirstLetter = (str) => checkIfStr(str)[0].toUpperCase() + checkIfStr(str).slice(1);

export const splitCamelCase = (str) => checkIfStr(str).split(/(?=[A-Z])/).join(' ');

const checkIfStr = (str) => (typeof str === 'string' && str.length > 0 ? str : 'ERROR');
