import React from "react";
import MonthOverview from "components/MonthOverview";
import Graph from "components/Graph";

function BottomPanel(props) {
  const { date, setDate, options, setOptions, entriesData, outreachData, moneyData } = props;

  return (
    <div className={"display-container"}>
      <Graph {...{ date, setDate, options, setOptions, entriesData, outreachData }} />
      <MonthOverview {...{ date, entriesData, outreachData, moneyData }} />
    </div>
  );
}

export default BottomPanel;
