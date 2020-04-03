import { parseISOToDateObj, parseDateObjToISO, convertUTCISOToUKDateISOSubstring } from 'utility/parseDates';
import { addOrSubtractDaysFromISODate, daysInMonth } from 'data/dates';

export const getPomodoroCount = (graphDataParameters) => {
	const dateArray = getAllPomodoroEntryDates(graphDataParameters.entriesData);
	const entries = getDaysWithEntries(dateArray);
	const tallyParameters = getTallyParameters(graphDataParameters);
	return createPomodoroTally(entries, tallyParameters);
};

const getTallyParameters = (graphDataParameters) => {
	const { startDate, period } = graphDataParameters;
	const tallyParameters = graphDataParameters.period.match(/week/)
		? getWeekTimeSpanParameters(startDate, period)
		: getMonthTimeSpanParameters(startDate);
	return tallyParameters;
};

const getWeekTimeSpanParameters = (startDate, period) => {
	if (period.match(/passed/)) startDate = addOrSubtractDaysFromISODate(startDate, -6);
	return {
		startDate,
		amountOfDays: 7
	};
};

const getMonthTimeSpanParameters = (startDate) => {
	const dateObj = parseISOToDateObj(startDate);
	const monthLength = daysInMonth(dateObj.month, dateObj.year);
	const startOfMonth = parseDateObjToISO({ ...dateObj, day: 1 });
	return {
		startDate: startOfMonth,
		amountOfDays: monthLength
	};
};

const createPomodoroTally = (counts, tallyParameters) => {
	const { startDate, amountOfDays } = tallyParameters;
	let tally = {};
	for (let i = 0; i < amountOfDays; i++) {
		const today = addOrSubtractDaysFromISODate(startDate, i).substring(0, 10);
		tally[today] = counts[today] ? counts[today] : 0;
	}
	return tally;
};

const getDaysWithEntries = (dateArray) => {
	let counts = {};
	dateArray.forEach((el) => {
		if (counts[el]) counts[el] += 1;
		else counts[el] = 1;
	});
	return counts;
};

const getAllPomodoroEntryDates = (entriesData) => {
	return entriesData.flatMap((el) => {
		return el.type === 'pomodoro' ? [ convertUTCISOToUKDateISOSubstring(el.date) ] : [];
	});
};
