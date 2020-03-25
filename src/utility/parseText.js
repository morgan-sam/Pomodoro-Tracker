export const capitalizeFirstLetter = (str) => {
	if (typeof str === 'string' && str.length > 0) return str[0].toUpperCase() + str.slice(1);
	else return str;
};
