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

export const convert12hrTo24hrTime = (i) => {
	if (i === '12am') return 0;
	if (i === '12pm') return 12;
	if (i.includes('am')) return parseInt(i.match(/[0-9]+/g));
	if (i.includes('pm')) return parseInt(i.match(/[0-9]+/g)) + 12;
};

export const getArrayTimes = (twelveHourClock) => {
	if (twelveHourClock) {
		return [ ...Array(25).keys() ].map((el) => convert24hrTo12hrTime(el));
	} else {
		return [ ...Array(25).keys() ].map((el) => el);
	}
};
