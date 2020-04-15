import { parseDateObjToISO, parseDateObjToBigEndian } from 'utility/parseDates';
import { daysInMonth, addSubtractDaysFromDateObj } from 'data/dates';

export const getPomodoroCount = (graphDataParameters) => {
	const dateArray = getAllPomodoroEntryDates(graphDataParameters.entriesData);
	const entries = getDaysWithEntries(dateArray);
	const tallyParameters = getTallyParameters(graphDataParameters);
	const pomodoroTally = createPomodoroTally(entries, tallyParameters);
	return pomodoroTally;
};

const getTallyParameters = (graphDataParameters) => {
	const { startDate, period } = graphDataParameters;
	const tallyParameters = graphDataParameters.period.match(/week/)
		? getWeekTimeSpanParameters(startDate, period)
		: getMonthTimeSpanParameters(startDate);
	return tallyParameters;
};

const getWeekTimeSpanParameters = (startDate, period) => {
	if (period.match(/passed/)) startDate = addSubtractDaysFromDateObj(startDate, -6);
	return {
		startDate,
		amountOfDays: 7
	};
};

const getMonthTimeSpanParameters = (startDate) => {
	const monthLength = daysInMonth(startDate.month, startDate.year);
	const startOfMonth = parseDateObjToISO({ ...startDate, day: 1 });
	return {
		startDate: startOfMonth,
		amountOfDays: monthLength
	};
};

const createPomodoroTally = (counts, tallyParameters) => {
	const { startDate, amountOfDays } = tallyParameters;
	let tally = {};
	for (let i = 0; i < amountOfDays; i++) {
		const todayObj = addSubtractDaysFromDateObj(startDate, i);
		const today = parseDateObjToBigEndian(todayObj);
		tally[today] = counts[today] ? counts[today] : 0;
	}
	return tally;
};

const getDaysWithEntries = (dateArray) => {
	let dateObject = {};
	dateArray.forEach((el) => {
		const stringDate = parseDateObjToBigEndian(el.date);
		if (!dateObject[stringDate]) {
			dateObject[stringDate] = 1;
		} else {
			dateObject[stringDate]++;
		}
	});
	return dateObject;
};

const getAllPomodoroEntryDates = (entriesData) => {
	return entriesData.filter((el) => {
		return el.type === 'pomodoro';
	});
};
