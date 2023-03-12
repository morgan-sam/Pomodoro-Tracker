import React from "react";
import TopPageText from "components/TopPageText";
import DateNavigation from "components/DateNavigation";
import Timeline from "components/Timeline";

function TopPanel(props) {
  return (
    <div className="top-panel">
      <div className={"top-panel-option"}>
        <TopPageText 
          entriesData={props.filteredEntries}
          date={props.date}
          emailCountData={props.emailCountData}
          setEmailCountData={props.setEmailCountData}
        />
        <DateNavigation date={props.date} setDate={props.setDate} />
      </div>
      <Timeline
        hourWidth={props.hourWidth}
        entries={props.filteredEntries}
        eventLengths={props.eventLengths}
        options={props.options}
      />
    </div>
  );
}
export default TopPanel;
