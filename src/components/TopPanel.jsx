import React from "react";
import TopPageText from "components/TopPageText";
import DateNavigation from "components/DateNavigation";
import HabitTracking from "components/HabitTracking";
import Timeline from "components/ElementsTimeline";
import {
  parseDateObjToLittleEndian,
  parseDateObjToBigEndian,
} from "utility/parseDates";

import TopRightButtons from "components/TopRightButtons";

function TopPanel(props) {
  const {
    date,
    setDate,
    options,
    setOptions,
    moneyData,
    setMoneyData,
    outreachData,
    setOutreachData,
    applicationsData,
    setApplicationsData,
    hourWidth,
    filteredEntries,
    eventLengths,
  } = props;
  const isToday =
    parseDateObjToBigEndian(date) === new Date().toISOString().substring(0, 10);
  return (
    <div className={"top-panel"}>
      <div className="header-container">
        <h1 className={"top-panel-title"}>
          Data for{" "}
          {isToday
            ? `today (${parseDateObjToLittleEndian(date)})`
            : parseDateObjToLittleEndian(date)}
        </h1>
        <TopRightButtons />
      </div>
      <div className={"top-panel-option"}>
        <TopPageText
          {...{
            date,
            options,
            setOptions,
            moneyData,
            setMoneyData,
            outreachData,
            setOutreachData,
            applicationsData,
            setApplicationsData,
            filteredEntries,
          }}
        />
        <DateNavigation {...{ date, setDate }} />
        <HabitTracking {...{ date, options, setOptions }} />
      </div>
      <Timeline {...{ hourWidth, filteredEntries, eventLengths, options }} />
    </div>
  );
}
export default TopPanel;
