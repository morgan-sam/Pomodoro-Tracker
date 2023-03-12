import React, { useState, useEffect } from "react";
import {
  parseDateObjToLittleEndian,
  parseDateObjToBigEndian,
  convertUTCISOToDateObj,
} from "utility/parseDates";
import { compareObjs } from "utility/sortAndCompare";
import { twoLeadingZeroes } from 'utility/parseText'


function TimelineToggles(props) {

  const {date, emailCountData, setEmailCountData} = props;
  const [displayEmailCount, setDisplayEmailCount] = useState(0);

  const todayDateString = `${date['year']}-${twoLeadingZeroes(date['month'])}-${twoLeadingZeroes(date['day'])}`;

  function changeEmailCount(newEmailCount) {
    const newEmailCountData = Object.assign({}, emailCountData);
    newEmailCountData[todayDateString] = newEmailCount;
    setEmailCountData(newEmailCountData)
  }

  function clickChangeEmailCount(changeAmount) {
    setDisplayEmailCount(Math.max(0, displayEmailCount + changeAmount))     
  }

  const getEventCountForDay = (event, date) => props.entriesData.filter((el) => el.type === event && compareObjs(el.date, date)).length;
  
  const isToday = parseDateObjToBigEndian(date) === new Date().toISOString().substring(0, 10);
  const todayEmailCount = parseInt(emailCountData[todayDateString]);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => changeEmailCount(displayEmailCount), 1000);
    return () => window.clearTimeout(timeoutID);   
  }, [displayEmailCount]);

  useEffect(() => {
    if (isNaN(todayEmailCount)) setDisplayEmailCount(0);
    else setDisplayEmailCount(todayEmailCount);
  }, [emailCountData, date]);
    
// Email count functionality

// - Display updated when email count data recieved
// - User changes display
// - Updates local state
// - Waits 1 or 2 seconds
// - Updateds global email count
// - Once global updated post request sent

  return (
    <div>
      <h1>Data for {parseDateObjToLittleEndian(date)}</h1>
      <h3>Total{compareObjs(date, convertUTCISOToDateObj(new Date().toISOString()).date) ? " for today": ""}:</h3>
      <h2 className={"top-page-text-title"}>Pomodoros: {getEventCountForDay("pomodoro", date)}</h2>
      <h2 className={"top-page-text-title"}>
        Emails: 
        <button onClick={() => clickChangeEmailCount(-1)} className={"arrow-button top-page-text-title-btn"}>-</button>
          {!isNaN(displayEmailCount) ? displayEmailCount : 0}
        <button onClick={() => clickChangeEmailCount(1)} className={"arrow-button top-page-text-title-btn"}>+</button>
      </h2>
    </div>
  );
}

export default TimelineToggles;
