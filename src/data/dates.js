import { parseDateObjToISO, parseISOToDateObj } from 'utility/parseDates';

export const getMonthIntegers = () => {
	return Array.from(Array(12).keys()).map((el) => el + 1);
};

export const shortDayStringArray = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

export const monthStringArray = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const get21stCenturyYears = () => {
	return Array.from(Array(100).keys()).map((el) => el + 2000);
};

export const arrayOfMonthDays = (month, year) => {
	if (typeof month === 'string') month = monthStringArray().indexOf(month) + 1;
	const totalDays = daysInMonth(month, year);
	return Array.from(Array(totalDays).keys()).map((el) => el + 1);
};

export const daysInMonth = (month, year) => {
	return new Date(year, month, 0).getDate();
};

export const getDayFromTodayAsISO = (dayDifference = 0) => {
	const day = new Date();
	day.setDate(day.getDate() + dayDifference);
	const stringDate = day.toISOString().match(/.+?(?=T)/g)[0];
	return `${stringDate}T00:00:00.000Z`;
};

export const addOrSubtractDaysFromISODate = (date, dayChange) => {
	console.log(dayChange);
	return new Date(Date.parse(date) + dayChange * 86400000).toISOString();
};

export const daysBetweenISODates = (firstDate, secondDate) => {
	const a = new Date(firstDate.substring(0, 10));
	const b = new Date(secondDate.substring(0, 10));
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

export const addOrSubtractDaysFromDateObj = (date, dayChange) => {
	const isoDate = parseDateObjToISO(date);
	const newDate = addOrSubtractDaysFromISODate(isoDate, dayChange);
	return parseISOToDateObj(newDate);
};
