const daysInMonth = (month, year) => {
	const monthDays = [ 31, 28 + (checkIfLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	return monthDays[month - 1];
};

const daysInYear = (year) => {
	return 365 + (checkIfLeapYear(year) ? 1 : 0);
};

const checkIfLeapYear = (year) => {
	if (year % 100 === 0) {
		if (year % 400 === 0) return true;
		else return false;
	} else {
		if (year % 4 === 0) return true;
		else return false;
	}
};

const genArrayRange = (a, b) => {
	return [ ...Array(b + 1).keys() ].slice(a, b + 1);
};

const dateToNumberOfDaysFromZeroAD = (date) => {
	const yearDaysTotal = sumOfArray(genArrayRange(0, date.year - 1).map((el) => daysInYear(el)));
	const monthDaysTotal = sumOfArray(genArrayRange(1, date.month - 1).map((el) => daysInMonth(el, date.year)));
	return yearDaysTotal + monthDaysTotal + date.day + 1;
};

const numberOfDaysFromZeroADToDate = (numberOfDays) => {
	numberOfDays--;
	let yearCount = 0;
	let daysToRemove = 0;

	while (daysToRemove + daysInYear(yearCount) < numberOfDays) {
		daysToRemove += daysInYear(yearCount);
		yearCount++;
	}

	let daysLeft = numberOfDays - daysToRemove;

	let monthCount = 1;
	for (let i = 1; i < 12; i++) {
		if (daysLeft > daysInMonth(i, yearCount)) {
			daysLeft -= daysInMonth(i, yearCount);
			monthCount++;
		}
	}

	const date = {
		day: daysLeft,
		month: monthCount,
		year: yearCount
	};

	return date;
};

const sumOfArray = (arr) => {
	let result = 0;
	for (let i = 0; i < arr.length; i++) result += arr[i];
	return result;
};

const addOrSubtractDaysFromDateObj = (date, dayChange) => {
	let numberOfDays = dateToNumberOfDaysFromZeroAD(date);
	numberOfDays += dayChange;
	return numberOfDaysFromZeroADToDate(numberOfDays);
};

console.log(addOrSubtractDaysFromDateObj({ day: 1, month: 1, year: 2000 }, 434535));
