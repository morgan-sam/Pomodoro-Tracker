export const parseISOToLittleEndian = (iso) => {
	const { day, month, year } = parseISOToDateObj(iso);
	return `${day}-${month}-${year}`;
};
export const parseISOToBigEndian = (iso) => {
	const dateObj = convertUTCISOToUKObj(iso).date;
	return parseDateObjToBigEndian(dateObj);
};

export const parseISOToDateObj = (iso) => {
	const date = new Date(iso);
	const day = date.getUTCDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return { day, month, year };
};

export const parseLittleEndianToObj = (string) => {
	const dateArray = string.split('-');
	return { day: dateArray[0], month: dateArray[1], year: dateArray[2] };
};

export const parseBigEndianToObj = (string) => {
	const dateArray = string.split('-');
	return { day: parseInt(dateArray[2]), month: parseInt(dateArray[1]), year: parseInt(dateArray[0]) };
};

export const parseDateObjToLittleEndian = (obj) => {
	const dayString = obj.day >= 10 ? parseInt(obj.day) : '0' + parseInt(obj.day);
	const monthString = obj.month >= 10 ? parseInt(obj.month) : '0' + parseInt(obj.month);
	return `${dayString}-${monthString}-${obj.year}`;
};
export const parseDateObjToBigEndian = (obj) => {
	const dayString = obj.day >= 10 ? parseInt(obj.day) : '0' + parseInt(obj.day);
	const monthString = obj.month >= 10 ? parseInt(obj.month) : '0' + parseInt(obj.month);
	return `${obj.year}-${monthString}-${dayString}`;
};

export const convertUTCISOToUKDateOnly = (iso) => {
	return new Date(iso).toLocaleString('en-US', { timeZone: 'Europe/London' }).match(/[0-9]+\/[0-9]+\/[0-9]+/g)[0];
};

export const convertUTCISOToUKDateISOSubstring = (iso) => {
	const localeString = new Date(iso)
		.toLocaleString('en-US', { timeZone: 'Europe/London' })
		.match(/[0-9]+\/[0-9]+\/[0-9]+/g)[0];
	const [ month, day, year ] = localeString.split('/');
	const dayString = day > 9 ? day : `0${day}`;
	const monthString = month > 9 ? month : `0${month}`;
	return `${year}-${monthString}-${dayString}`;
};

export const convertUTCISOToUKObj = (iso) => {
	const date = new Date(iso).toLocaleString('en-US', { timeZone: 'Europe/London' });
	const [ month, day, year ] = date.match(/[0-9]+\/[0-9]+\/[0-9]+/g)[0].split('/').map((el) => parseInt(el));
	const [ hour, minute, second ] = date.match(/[0-9]+:[0-9]+:[0-9]+/g)[0].split(':').map((el) => parseInt(el));
	const meridiem = date.match(/[a-zA-Z]+/g)[0];
	return { date: { day, month, year }, time: { minute, hour: hour + (meridiem === 'PM' && hour !== 12 ? 12 : 0) } };
};
