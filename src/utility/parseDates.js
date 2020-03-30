export const parseISOToLittleEndian = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	return stringDate.split('-').reverse().join('-');
};

export const parseISOToDateObj = (string) => {
	const stringDate = string.match(/.+?(?=T)/g)[0];
	const dateSplitString = stringDate.split('-').reverse();
	const dateArray = dateSplitString.map((el) => parseInt(el));
	return { day: dateArray[0], month: dateArray[1], year: dateArray[2] };
};

export const parseDateObjToISO = (obj) => {
	const dayString = obj.day >= 10 ? parseInt(obj.day) : '0' + parseInt(obj.day);
	const monthString = obj.month >= 10 ? parseInt(obj.month) : '0' + parseInt(obj.month);
	return `${obj.year}-${monthString}-${dayString}T00:00:00.000Z`;
};

export const parseLittleEndianToObj = (string) => {
	const dateArray = string.split('-');
	return { day: dateArray[0], month: dateArray[1], year: dateArray[2] };
};

export const parseBigEndianToObj = (string) => {
	const dateArray = string.split('-');
	return { day: dateArray[2], month: dateArray[1], year: dateArray[0] };
};

export const parseDateObjToLittleEndian = (obj) => {
	const dayString = obj.day >= 10 ? parseInt(obj.day) : '0' + parseInt(obj.day);
	const monthString = obj.month >= 10 ? parseInt(obj.month) : '0' + parseInt(obj.month);
	return `${dayString}-${monthString}-${obj.year}`;
};
