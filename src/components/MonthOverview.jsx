import React, { useContext } from "react";
import { ColorThemeContext } from "context/theme";
import { getDaysInMonth, monthStringArray, daysOfWeekArray, arrayOfMonthDays } from "data/dates";
import { twoLeadingZeroes } from "utility/parseText";
import { changeHSLOpacity } from "utility/color";
import EmailSvg from "img/email.svg";
import ApplicationSvg from "img/application.svg";
import { sumArr } from "utility/general";
import MonthStatistics from "components/MonthStatistics";

function MonthOverview(props) {
  const { date, entriesData, outreachData, applicationsData, moneyData } = props;
  const colorTheme = useContext(ColorThemeContext);
  
  const getMonthPomodoroObj = (date, entriesData) => {
    let thisMonthsPomodorosObject = Object.fromEntries(date ? Array(getDaysInMonth(date.month, date.year)).fill(0).map((el, i) => [i + 1, 0]) : []);  
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
    let thisMonthsOutreachObject = Object.fromEntries(date ? Array(getDaysInMonth(date.month, date.year)).fill(0).map((el, i) => [i + 1, 0]) : []);  
    Object.entries(outreachData).forEach(([key, value]) => {
      if (key.includes(`${date.year}-${twoLeadingZeroes(date.month)}`)) thisMonthsOutreachObject[parseInt(key.split('-')[2])] = value;
    });
    return thisMonthsOutreachObject;
  } 

  const getMonthApplicationsObj = (date, applicationsData) => {
    let thisMonthsApplicationsObject = Object.fromEntries(date ? Array(getDaysInMonth(date.month, date.year)).fill(0).map((el, i) => [i + 1, 0]) : []);  
    Object.entries(applicationsData).forEach(([key, value]) => {
      if (key.includes(`${date.year}-${twoLeadingZeroes(date.month)}`)) thisMonthsApplicationsObject[parseInt(key.split('-')[2])] = value;
    });
    return thisMonthsApplicationsObject;
  } 


  const getThisMonthsAverageOfDateObj = (date, thisMonthsObject) => {
    const thisMonthsArray = Object.values(thisMonthsObject);
    // get number of days in month not including days past current day
    let daysInMonth = getDaysInMonth(date.month, date.year);
    const isCurrentMonth = date.year === new Date().getFullYear() && date.month === new Date().getMonth() + 1;
    if (isCurrentMonth) daysInMonth = new Date().getDate();
    const thisMonthsSum = thisMonthsArray.reduce((a, b) => a + b, 0);
    return Math.round((thisMonthsSum / daysInMonth + Number.EPSILON) * 100) / 100
  }

  const thisMonthsPomodorosObject = getMonthPomodoroObj(date, entriesData);
  const thisMonthsOutreachObject = getMonthOutreachObj(date, outreachData);
  const thisMonthsApplicationsObject = getMonthApplicationsObj(date, applicationsData);
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
          const applicationsOpacity = 1/20 * thisMonthsApplicationsObject[day];
          const applicationsSymbolStyle = { background: changeHSLOpacity(colorTheme.darker, applicationsOpacity) };

          const todayDateString = `${date.year}-${twoLeadingZeroes(date.month)}-${twoLeadingZeroes(day)}`;
          // const todayMoneyCount = moneyData[todayDateString] || 0;
          return (
            <div className="overview-day-node" key={day}>
              <div className="day-label">{day}</div>
              <div className="pomodoro-count">
                {twoLeadingZeroes(thisMonthsPomodorosObject[day])} <span className="pomodoro-symbol" style={pomodoroSymbolStyle}></span>
              </div>
              <div className="outreach-count">{twoLeadingZeroes(thisMonthsOutreachObject[day])} <img className="email-symbol" style={outreachSymbolStyle} src={EmailSvg} alt="email" /></div>
              <div className="applications-count">{twoLeadingZeroes(thisMonthsApplicationsObject[day])} <img className="email-symbol" style={applicationsSymbolStyle} src={ApplicationSvg} alt="email" /></div>
              {/* <div className="money-count"><span>${todayMoneyCount}</span></div> */}
            </div>
          )
        })}
        <div className="overview-statistics" style={{ gridColumn: `span ${7 - (getDaysInMonth(date.month, date.year) % 7)}` }}>
          <MonthStatistics 
            totalPomodoros={sumArr(Object.values(thisMonthsPomodorosObject))}
            averagePomodoros={getThisMonthsAverageOfDateObj(date, thisMonthsPomodorosObject)}
            totalOutreach={sumArr(Object.values(thisMonthsOutreachObject))}
            averageOutreach={getThisMonthsAverageOfDateObj(date, thisMonthsOutreachObject)}
            totalApplications={sumArr(Object.values(thisMonthsApplicationsObject))}
            averageApplications={getThisMonthsAverageOfDateObj(date, thisMonthsApplicationsObject)}
          />
        </div>
      </div>
    </div>
  );
}

export default MonthOverview;
