import React, { useContext } from "react";
import { ColorThemeContext } from "context/theme";
import { getDaysInMonth, monthStringArray, daysOfWeekArray, arrayOfMonthDays } from "data/dates";
import { twoLeadingZeroes } from "utility/parseText";

import EmailSvg from "img/email.svg";

function MonthOverview(props) {
  const { date, entriesData, outreachData } = props;
  const colorTheme = useContext(ColorThemeContext);
  console.log(colorTheme);
  console.log(outreachData);

  const getMonthPomodoroObj = () => {
    let thisMonthsPomodorosObject = Object.fromEntries(
      date ? Array(getDaysInMonth(date.month, date.year)).fill(0).map((el, i) => [i + 1, 0]) : []
    );  
    entriesData.filter(event => {
      if (event.date.month === date.month && event.date.year === date.year && event.type === 'pomodoro') {
          const day = event.date.day;
          if (thisMonthsPomodorosObject[day]  === undefined) thisMonthsPomodorosObject[day] = 0;
          else thisMonthsPomodorosObject[day] = thisMonthsPomodorosObject[day] + 1;
      }
    });
    return thisMonthsPomodorosObject;
  }
  const thisMonthsPomodorosObject = getMonthPomodoroObj(date, entriesData);
  const starOfMonthWeekdayOffset = new Date(`${date.year}-${date.month}-${1}`).getDay();

  return (
    <div className="month-overview">
      {monthStringArray[(date.month - 1)] + ' ' + date.year} 
      <div className="month-overview-days-container">
        {[...Array(7).keys()].map(day =>
          <div key={day}>
            {daysOfWeekArray[(day + starOfMonthWeekdayOffset) % 7].substring(0,3)}
          </div>
        )}
        {arrayOfMonthDays(date.month, date.year).map(day => {
          const d = new Date(`${date.year}-${date.month}-${day}`);
          let dayOfWeek = d.getDay();
          const pomodoroSymbolStyle = {
            background: colorTheme.darker,
            filter: `opacity(${1/16 * thisMonthsPomodorosObject[day]})`
          }
          return (
            <div className="overview-day-node" key={day}>
              <div className="day-label">{day}</div>
              <div className="pomodoro-count">
                {twoLeadingZeroes(thisMonthsPomodorosObject[day])} <span className="pomodoro-symbol" style={pomodoroSymbolStyle}></span>
              </div>
              <div className="outreach-count">00 <img className="email-symbol" src={EmailSvg} alt="email" /></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default MonthOverview;
