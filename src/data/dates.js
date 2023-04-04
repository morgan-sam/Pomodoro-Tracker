import { convertUTCISOToDateObj } from "../utility/parseDates.js";

const QUADRICENTENARY = 146097;

export const getMonthIntegers = () => {
  return Array.from(Array(12).keys()).map((el) => el + 1);
};

export const daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const monthStringArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const get21stCenturyYears = () => {
  return Array.from(Array(100).keys()).map((el) => el + 2000);
};

export const arrayOfMonthDays = (month, year) => {
  if (typeof month === "string") month = monthStringArray().indexOf(month) + 1;
  const totalDays = daysInMonth(month, year);
  return Array.from(Array(totalDays).keys()).map((el) => el + 1);
};


export const getTodaysDateAsObj = () => {
  return convertUTCISOToDateObj(new Date().toISOString());
};

export const isDateToday = (date) => {
  const today = getTodaysDateAsObj().date;
  return date.day === today.day && date.month === today.month && date.year === today.year;
};

export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};


export const daysInMonth = (month, year) => {
  const monthDays = [
    31,
    28 + (checkIfLeapYear(year) ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
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
  return [...Array(b + 1).keys()].slice(a, b + 1);
};

const dateToNumberOfDaysFromZeroAD = (date) => {
  const yearDaysTotal = sumOfArray(
    genArrayRange(0, date.year - 1).map((el) => daysInYear(el))
  );
  const monthDaysTotal = sumOfArray(
    genArrayRange(1, date.month - 1).map((el) => daysInMonth(el, date.year))
  );
  return yearDaysTotal + monthDaysTotal + date.day;
};

const numberOfDaysFromZeroADToDate = (numberOfDays) => {
  let yearCount = 0;
  let daysToRemove = 0;

  while (QUADRICENTENARY < numberOfDays - daysToRemove) {
    daysToRemove += QUADRICENTENARY;
    yearCount += 400;
  }

  while (daysToRemove + daysInYear(yearCount) < numberOfDays) {
    daysToRemove += daysInYear(yearCount);
    yearCount++;
  }

  let daysLeft = numberOfDays - daysToRemove;

  let monthCount = 1;
  for (let i = 1; i <= 12; i++) {
    if (daysLeft > daysInMonth(i, yearCount)) {
      daysLeft -= daysInMonth(i, yearCount);
      monthCount++;
    } else break;
  }
  const date = {
    day: daysLeft,
    month: monthCount,
    year: yearCount,
  };

  return date;
};

const sumOfArray = (arr) => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) result += arr[i];
  return result;
};

export const addSubtractDaysFromDateObj = (date, dayChange) => {
  let numberOfDays = dateToNumberOfDaysFromZeroAD(date);
  return numberOfDaysFromZeroADToDate(numberOfDays + dayChange);
};

//resets to first day of month
export const addSubtractMonthsFromDateObj = (date, monthChange) => {
  let { month, year } = date;
  month += monthChange;
  if (month > 12) {
    month -= 12;
    ++year;
  } else if (month < 1) {
    month += 12;
    --year;
  }
  return { day: 1, month, year };
};
