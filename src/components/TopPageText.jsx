import React, { useState, useEffect } from "react";
import {
  parseDateObjToLittleEndian,
  parseDateObjToBigEndian,
  convertUTCISOToDateObj,
} from "utility/parseDates";
import { compareObjs } from "utility/sortAndCompare";
import { twoLeadingZeroes } from 'utility/parseText'


function TimelineToggles(props) {

  const {date, outreachData, setOutreachData} = props;
  const [displayOutreachCount, setDisplayOutreachCount] = useState(0);

  const todayDateString = `${date['year']}-${twoLeadingZeroes(date['month'])}-${twoLeadingZeroes(date['day'])}`;

  function changeOutreachCount(newOutreachCount) {
    const newOutreachData = Object.assign({}, outreachData);
    newOutreachData[todayDateString] = newOutreachCount;
    setOutreachData(newOutreachData)
  }

  function clickChangeOutreachCount(changeAmount) {
    setDisplayOutreachCount(Math.max(0, displayOutreachCount + changeAmount))     
  }

  const getEventCountForDay = (event, date) => props.entriesData.filter((el) => el.type === event && compareObjs(el.date, date)).length;
  
  const isToday = parseDateObjToBigEndian(date) === new Date().toISOString().substring(0, 10);
  const todayOutreachCount = parseInt(outreachData[todayDateString]);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => changeOutreachCount(displayOutreachCount), 1000);
    return () => window.clearTimeout(timeoutID);   
  }, [displayOutreachCount]);

  useEffect(() => {
    if (isNaN(todayOutreachCount)) setDisplayOutreachCount(0);
    else setDisplayOutreachCount(todayOutreachCount);
  }, [outreachData, date]);

  return (
    <div>
      <h1>Data for {parseDateObjToLittleEndian(date)}</h1>
      <h3>Total{compareObjs(date, convertUTCISOToDateObj(new Date().toISOString()).date) ? " for today": ""}:</h3>
      <h2 className={"top-page-text-title"}>Pomodoros: {getEventCountForDay("pomodoro", date)}</h2>
      <h2 className={"top-page-text-title"}>
        Outreach: 
        <button onClick={() => clickChangeOutreachCount(-1)} className={"arrow-button top-page-text-title-btn"}>-</button>
          {!isNaN(displayOutreachCount) ? displayOutreachCount : 0}
        <button onClick={() => clickChangeOutreachCount(1)} className={"arrow-button top-page-text-title-btn"}>+</button>
      </h2>
    </div>
  );
}

export default TimelineToggles;
