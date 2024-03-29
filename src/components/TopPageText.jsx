import React, { useState, useEffect } from "react";
import {
  parseDateObjToLittleEndian,
  parseDateObjToBigEndian,
  convertUTCISOToDateObj,
} from "utility/parseDates";
import { compareObjs } from "utility/sortAndCompare";
import { twoLeadingZeroes } from "utility/parseText";
import { updateOutreachData } from "data/queries";
import { updateApplicationsData } from "data/queries";
import MoneyControl from "components/MoneyControl";

function TopPageText(props) {
  const {
    date,
    outreachData,
    setOutreachData,
    applicationsData,
    setApplicationsData,
    moneyData,
    setMoneyData,
    filteredEntries: entries,
  } = props;
  const [displayOutreachCount, setDisplayOutreachCount] = useState(0);
  const [displayApplicationsCount, setDisplayApplicationsCount] = useState(0);
  const [changingOutreachTimerID, setChangingOutreachTimerID] = useState(false);
  const [changingApplicationsTimerID, setChangingApplicationsTimerID] =
    useState(false);

  const todayDateString = `${date["year"]}-${twoLeadingZeroes(
    date["month"]
  )}-${twoLeadingZeroes(date["day"])}`;

  // OUTREACH

  function changeOutreachCount(newOutreachCount) {
    const newOutreachData = Object.assign({}, outreachData);
    newOutreachData[todayDateString] = newOutreachCount;
    setOutreachData(newOutreachData);
    updateOutreachData(todayDateString, newOutreachCount);
    setChangingOutreachTimerID(null);
  }

  function clickChangeOutreachCount(changeAmount) {
    const newOutreachAmount = Math.max(0, displayOutreachCount + changeAmount);
    setDisplayOutreachCount(Math.max(0, newOutreachAmount));
    const timeoutID = setTimeout(
      () => changeOutreachCount(newOutreachAmount),
      1000
    );
    setChangingOutreachTimerID(timeoutID);
  }

  // APPLICATIONS

  function changeApplicationsCount(newApplicationsCount) {
    const newApplicationsData = Object.assign({}, applicationsData);
    newApplicationsData[todayDateString] = newApplicationsCount;
    setApplicationsData(newApplicationsData);
    updateApplicationsData(todayDateString, newApplicationsCount);
    setChangingApplicationsTimerID(null);
  }

  function clickChangeApplicationsCount(changeAmount) {
    const newApplicationsAmount = Math.max(
      0,
      displayApplicationsCount + changeAmount
    );
    setDisplayApplicationsCount(Math.max(0, newApplicationsAmount));
    const timeoutID = setTimeout(
      () => changeApplicationsCount(newApplicationsAmount),
      1000
    );
    setChangingApplicationsTimerID(timeoutID);
  }

  const getEventCountForDay = (event, date) =>
    entries.filter((el) => el.type === event && compareObjs(el.date, date))
      .length;

  const isToday =
    parseDateObjToBigEndian(date) === new Date().toISOString().substring(0, 10);

  useEffect(() => {
    const todayDateString = `${date["year"]}-${twoLeadingZeroes(
      date["month"]
    )}-${twoLeadingZeroes(date["day"])}`;
    const todayOutreachCount = outreachData
      ? parseInt(outreachData[todayDateString])
      : 0;
    const todayApplicationsCount = applicationsData
      ? parseInt(applicationsData[todayDateString])
      : 0;
    if (isNaN(todayOutreachCount)) setDisplayOutreachCount(0);
    else setDisplayOutreachCount(todayOutreachCount);
    if (isNaN(todayApplicationsCount)) setDisplayApplicationsCount(0);
    else setDisplayApplicationsCount(todayApplicationsCount);
  }, [applicationsData, outreachData, date]);

  useEffect(() => {
    return () => {
      if (changingOutreachTimerID) {
        clearTimeout(changingOutreachTimerID);
      }
    };
  }, [changingOutreachTimerID]);

  useEffect(() => {
    return () => {
      if (changingApplicationsTimerID) {
        clearTimeout(changingApplicationsTimerID);
      }
    };
  }, [changingApplicationsTimerID]);

  return (
    <div>
      <h1>
        Data for{" "}
        {isToday
          ? `today (${parseDateObjToLittleEndian(date)})`
          : parseDateObjToLittleEndian(date)}
      </h1>
      <h2 className={"top-page-text-title"}>
        Pomodoros: {getEventCountForDay("pomodoro", date)}
      </h2>
      {/* OUTREACH */}
      <h2 className={"top-page-text-title"}>
        Outreach:
        <button
          onClick={() => clickChangeOutreachCount(-1)}
          className={"arrow-button top-page-text-title-btn"}
        >
          -
        </button>
        {!isNaN(displayOutreachCount) ? displayOutreachCount : 0}
        <button
          onClick={() => clickChangeOutreachCount(1)}
          className={"arrow-button top-page-text-title-btn"}
        >
          +
        </button>
        {changingOutreachTimerID && (
          <div className={"inline-loading-spinner"} />
        )}
      </h2>
      {/* APPLICATIONS */}
      <h2 className={"top-page-text-title"}>
        Applications:
        <button
          onClick={() => clickChangeApplicationsCount(-1)}
          className={"arrow-button top-page-text-title-btn"}
        >
          -
        </button>
        {!isNaN(displayApplicationsCount) ? displayApplicationsCount : 0}
        <button
          onClick={() => clickChangeApplicationsCount(1)}
          className={"arrow-button top-page-text-title-btn"}
        >
          +
        </button>
        {changingApplicationsTimerID && (
          <div className={"inline-loading-spinner"} />
        )}
      </h2>

      {/* <MoneyControl {...{ date, moneyData, setMoneyData }} /> */}
    </div>
  );
}

export default TopPageText;
