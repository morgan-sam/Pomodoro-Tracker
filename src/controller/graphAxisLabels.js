import { parseBigEndianToObj } from "utility/parseDates";

export const getXAxisLabelObj = (parameters) => {
  const { index, period, position, date } = parameters;
  return {
    x: position,
    dateText: getXAxisLabelText(period, date).reverse(),
    raisedMonthLabel: (period === "month") * (index % 2),
  };
};

function getXAxisLabelText(period, date) {
  const dateObj = parseBigEndianToObj(date);
  const shortDayString = new Date(`${date}T00:00:00.000Z`)
    .toString()
    .substring(0, 3);
  if (period.match(/week/))
    return [shortDayString, `${dateObj.day}/${dateObj.month}`];
  if (period === "month") return [`${parseInt(dateObj.day)}`];
}
