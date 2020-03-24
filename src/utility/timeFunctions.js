export const convert24hrTo12hrTime = (i) => {
	const period = i < 12 ? 'am' : 'pm';
	let newTime = i % 12;
	if (newTime === 0) newTime = 12;
	return newTime + period;
};

export const convertISOToTimeObj = (isoString) => {
	const timeLetters = isoString.split('').slice(11, 17);
	return {
		hours: parseInt(timeLetters[0] + timeLetters[1]),
		minutes: parseInt(timeLetters[3] + timeLetters[4])
	};
};

export const getISODateXDaysAway = (date, dayChange) => {
	return new Date(Date.parse(date) + dayChange * 86400000).toISOString().substring(0, 10);
};
