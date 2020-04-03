import { parseBigEndianToObj } from 'utility/parseDates';

export const getXAxisLabelObj = (el, i, period) => {
	return {
		x: el.coordinate.x,
		dateText: getXAxisLabelText(period, el.date).reverse(),
		raisedMonthLabel: (period === 'month') * (i % 2)
	};
};

function getXAxisLabelText(period, date) {
	const dateObj = parseBigEndianToObj(date);
	const shortDayString = new Date(`${date}T00:00:00.000Z`).toString().substring(0, 3);
	if (period.match(/week/)) return [ shortDayString, `${dateObj.day}/${dateObj.month}` ];
	if (period === 'month') return [ `${parseInt(dateObj.day)}` ];
}
