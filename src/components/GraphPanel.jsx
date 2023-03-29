import React from "react";
import MonthOverview from "components/MonthOverview";
import Graph from "components/Graph";

function GraphPanel(props) {
  const { date, setDate, options, entriesData, outreachData } = props;

  return (
    <div className={"display-container"}>
      <Graph {...{ date, setDate, options, entriesData, outreachData }} />
      <MonthOverview {...{ date, entriesData, outreachData }} />
    </div>
  );
}

export default GraphPanel;
