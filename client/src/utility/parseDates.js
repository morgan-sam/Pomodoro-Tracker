export const parseISOToLittleEndian = (iso) => {
	const { day, month, year } = parseISOToDateObj(iso);
	return `${day}-${month}-${year}`;
};

export const parseISOToDateObj = (iso) => {
	const date = new Date(iso);
	const day = date.getUTCDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return { day, month, year };
};

export const parseDateObjToISO = (obj) => {
	const { day, month, year } = obj;
	const date = new Date(year, month - 1, day);
	return date.toISOString();
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

export const getDateHourOffset = () => {
	return new Date().getTimezoneOffset() / -60;
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
	const [ hour, minute, second ] = date.match(/[0-9]+\:[0-9]+\:[0-9]+/g)[0].split(':').map((el) => parseInt(el));
	const meridiem = date.match(/[a-zA-Z]+/g)[0];
	return { date: { day, month, year }, time: { minute, hour: hour + (meridiem === 'PM' ? 12 : 0) } };
};
