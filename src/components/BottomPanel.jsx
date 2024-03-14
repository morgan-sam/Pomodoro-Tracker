import React from "react";
import MonthOverview from "components/MonthOverview";
import Graph from "components/Graph";

function BottomPanel(props) {
  const {
    date,
    setDate,
    options,
    setOptions,
    entriesData,
    outreachData,
    applicationsData,
    moneyData,
  } = props;

  return (
    <div className={"display-container"}>
      <Graph
        {...{
          date,
          setDate,
          options,
          setOptions,
          entriesData,
          outreachData,
          applicationsData,
        }}
      />
      <MonthOverview
        {...{ date, entriesData, outreachData, applicationsData, moneyData }}
      />
    </div>
  );
}

export default BottomPanel;
