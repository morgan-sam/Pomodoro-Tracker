import React, { useState, useEffect } from "react";
import {
  parseDateObjToLittleEndian,
  parseDateObjToBigEndian,
  convertUTCISOToDateObj,
} from "utility/parseDates";
import { compareObjs } from "utility/sortAndCompare";
import { twoLeadingZeroes } from 'utility/parseText'
import { postMoneyData, postOutreachData } from "data/queries";


function TimelineToggles(props) {

  const {date, outreachData, setOutreachData, moneyData, setMoneyData} = props;
  const [displayOutreachCount, setDisplayOutreachCount] = useState(0);
  const [changingOutreachTimerID, setChangingOutreachTimerID] = useState(false);

  const todayDateString = `${date['year']}-${twoLeadingZeroes(date['month'])}-${twoLeadingZeroes(date['day'])}`;

  function changeOutreachCount(newOutreachCount) {
    const newOutreachData = Object.assign({}, outreachData);
    newOutreachData[todayDateString] = newOutreachCount;
    setOutreachData(newOutreachData);
    postOutreachData(newOutreachData);
    setChangingOutreachTimerID(null);
  }
  function changeMoneyCount(newMoneyCount) {
    const newMoneyData = Object.assign({}, moneyData);
    newMoneyData[todayDateString] = newMoneyCount;
    setMoneyData(newMoneyData);
    postMoneyData(newMoneyData);
  }

  function clickChangeOutreachCount(changeAmount) {
    const newOutreachAmount = Math.max(0, displayOutreachCount + changeAmount);
    setDisplayOutreachCount(Math.max(0, newOutreachAmount));
    const timeoutID = setTimeout(() => changeOutreachCount(newOutreachAmount), 1000);
    setChangingOutreachTimerID(timeoutID);
  }

  const getEventCountForDay = (event, date) => props.entriesData.filter((el) => el.type === event && compareObjs(el.date, date)).length;
  
  const isToday = parseDateObjToBigEndian(date) === new Date().toISOString().substring(0, 10);
  const todayOutreachCount = parseInt(outreachData[todayDateString]);
  const todayMoneyCount = moneyData ? moneyData[todayDateString] : null;

  useEffect(() => {
    const todayDateString = `${date['year']}-${twoLeadingZeroes(date['month'])}-${twoLeadingZeroes(date['day'])}`;
    const todayOutreachCount = parseInt(outreachData[todayDateString]);
    if (isNaN(todayOutreachCount)) setDisplayOutreachCount(0);
    else setDisplayOutreachCount(todayOutreachCount);
  }, [outreachData, date]);


  useEffect(() => {
    return () => {
      if (changingOutreachTimerID) {
        clearTimeout(changingOutreachTimerID);
      }
    };
  }, [changingOutreachTimerID]);

  return (
    <div>
      <h1>Data for {isToday ? `today (${parseDateObjToLittleEndian(date)})` : parseDateObjToLittleEndian(date)}</h1>
      <h2 className={"top-page-text-title"}>Pomodoros: {getEventCountForDay("pomodoro", date)}</h2>
      <h2 className={"top-page-text-title"}>
        Outreach: 
        <button onClick={() => clickChangeOutreachCount(-1)} className={"arrow-button top-page-text-title-btn"}>-</button>
          {!isNaN(displayOutreachCount) ? displayOutreachCount : 0}
        <button onClick={() => clickChangeOutreachCount(1)} className={"arrow-button top-page-text-title-btn"}>+</button>
        {changingOutreachTimerID && <div className={"inline-loading-spinner"} />}
      </h2>
      <h2 className={"top-page-text-title"}>
        <label for="currency-input">Money: $</label>
        <input type="number" id="currency-input" name="currency" min="0.01" max="1000" step="0.01" value={7000}/>
        <button class="tick-button"></button>
        <button class="cross-button"></button>
      </h2>
    </div> 
  );
}

export default TimelineToggles;
