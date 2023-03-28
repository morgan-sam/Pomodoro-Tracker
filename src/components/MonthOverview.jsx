import React, { useContext } from "react";
import { ColorThemeContext } from "context/theme";
import { getDaysInMonth, monthStringArray, daysOfWeekArray, arrayOfMonthDays } from "data/dates";
import { twoLeadingZeroes } from "utility/parseText";

import EmailSvg from "img/email.svg";

function MonthOverview(props) {
  const { date, entriesData, outreachData } = props;
  const colorTheme = useContext(ColorThemeContext);
  
  const getMonthPomodoroObj = (date, entriesData) => {
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
  
  const getMonthOutreachObj = (date, outreachData) => {
    let thisMonthsOutreachObject = Object.fromEntries(
      date ? Array(getDaysInMonth(date.month, date.year)).fill(0).map((el, i) => [i + 1, 0]) : []
    );  
    Object.entries(outreachData).forEach(([key, value]) => {
      if (key.includes(`${date.year}-${twoLeadingZeroes(date.month)}`)) {
        thisMonthsOutreachObject[parseInt(key.split('-')[2])] = value;
      }
    });
    return thisMonthsOutreachObject;
  } 

  const changeHSLOpacity = (hsl, opacity) => {
    const hslArray = hsl.replace('hsl(', '').replace(')', '').split(', ');
    return `hsla(${hslArray[0]}, ${hslArray[1]}, ${hslArray[2]}, ${opacity})`;
  }

  const thisMonthsPomodorosObject = getMonthPomodoroObj(date, entriesData);
  const thisMonthsOutreachObject = getMonthOutreachObj(date, outreachData);
  const starOfMonthWeekdayOffset = new Date(`${date.year}-${date.month}-${1}`).getDay();

  return (
    <div className="month-overview">
      <h3>{monthStringArray[(date.month - 1)] + ' ' + date.year}</h3> 
      <div className="month-overview-days-container">
        {[...Array(7).keys()].map(day =>
          <div key={day}>
            {daysOfWeekArray[(day + starOfMonthWeekdayOffset) % 7].substring(0,3)}
          </div>
        )}
        {arrayOfMonthDays(date.month, date.year).map(day => {
          const pomodoroOpacity = 1/16 * thisMonthsPomodorosObject[day];
          const pomodoroSymbolStyle = { background: changeHSLOpacity(colorTheme.darker, pomodoroOpacity) };
          const outreachOpacity = 1/20 * thisMonthsOutreachObject[day];
          const outreachSymbolStyle = { background: changeHSLOpacity(colorTheme.darker, outreachOpacity) };
          return (
            <div className="overview-day-node" key={day}>
              <div className="day-label">{day}</div>
              <div className="pomodoro-count">
                {twoLeadingZeroes(thisMonthsPomodorosObject[day])} <span className="pomodoro-symbol" style={pomodoroSymbolStyle}></span>
              </div>
              <div className="outreach-count">{twoLeadingZeroes(thisMonthsOutreachObject[day])} <img className="email-symbol" style={outreachSymbolStyle} src={EmailSvg} alt="email" /></div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default MonthOverview;
