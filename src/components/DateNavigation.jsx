import React, { useContext } from "react";
import DateSelect from "components/DateSelect";
import DateArrowButton from "components/DateArrowButton";
import { isDateToday, getTodaysDateAsObj } from "data/dates";
import { getSystemButtonStyle } from "styles/settings";
import { DarkThemeContext } from "context/theme";

const DateNavigation = (props) => {
  const isToday = isDateToday(props.date);
  const darkTheme = useContext(DarkThemeContext);
  return (
    <div className={"date-nav-container"}>
      <DateSelect
        date={props.date}
        setDate={(dateObj) => {
          props.setDate(dateObj);
        }}
      />
      <div className={"date-nav-arrow-container"}>
        <DateArrowButton {...props} direction={"left"} />
        <button
          onClick={() => props.setDate(getTodaysDateAsObj().date)}
          style={{...getSystemButtonStyle(darkTheme), opacity: isToday ? '0.5' : '1'}}
          disabled={isToday}
        >
          {"Reset To Today"}
        </button>
        <DateArrowButton {...props} direction={"right"} />
      </div>
    </div>
  );
};
export default DateNavigation;
