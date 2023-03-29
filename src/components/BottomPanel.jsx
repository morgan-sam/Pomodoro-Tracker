import React from "react";
import MonthOverview from "components/MonthOverview";
import Graph from "components/Graph";

function BottomPanel(props) {
  const { date, setDate, options, setOptions, entriesData, outreachData } = props;

  return (
    <div className={"display-container"}>
      <Graph {...{ date, setDate, options, setOptions, entriesData, outreachData }} />
      <MonthOverview {...{ date, entriesData, outreachData }} />
    </div>
  );
}

export default BottomPanel;
