import React from "react";
import TopPageText from "components/TopPageText";
import DateNavigation from "components/DateNavigation";
import Timeline from "components/Timeline";

function TopPanel(props) {
  const { date, setDate, options, setOptions, moneyData, setMoneyData, outreachData, setOutreachData, hourWidth, filteredEntries, eventLengths } = props;
  return (
    <div className="top-panel">
      <div className={"top-panel-option"}>
        <TopPageText 
          {...{ date, options, setOptions, moneyData, setMoneyData, outreachData, setOutreachData, filteredEntries }}
        />
        <DateNavigation {...{date, setDate }} />
      </div>
      <Timeline
          {...{ hourWidth, filteredEntries, eventLengths, options }}
      />
    </div>
  );
}
export default TopPanel;
