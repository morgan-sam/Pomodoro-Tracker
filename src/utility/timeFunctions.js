export const convert24hrTo12hrTime = (i) => {
	let period = i < 12 ? 'am' : 'pm';
	if (i === 24) period = 'am';
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
	return new Date(Date.parse(date) + dayChange * 86400000).toISOString();
};

export const convert12hrTo24hrTime = (i) => {
	if (i === '12am') return 0;
	if (i.includes('am')) return parseInt(i.match(/[0-9]+/g));
	if (i.includes('pm')) return parseInt(i.match(/[0-9]+/g)) + 12;
};

export const getArrayTimes = (twelveHourClock, offset) => {
	if (twelveHourClock) {
		return [ ...Array(24).keys() ].map((el) => convert24hrTo12hrTime(el + offset));
	} else {
		return [ ...Array(24).keys() ].map((el) => el + offset);
	}
};
