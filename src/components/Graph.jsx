import React, { useState, useContext } from "react";
import GraphCanvas from "components/GraphCanvas";
import { getSystemButtonStyle } from "styles/settings";
import { graphPeriodOptions } from "data/defaultState";
import {
  getTodaysDateAsObj,
  monthStringArray,
  addSubtractMonths,
} from "data/dates";
import { DarkThemeContext } from "context/theme";
import { convertTextToTitleCase } from "utility/parseText";

function Graph(props) {
  const {
    date,
    setDate,
    options,
    setOptions,
    entriesData,
    outreachData,
    applicationsData,
  } = props;
  const [periodOffset, setPeriodOffset] = useState(0);
  const darkTheme = useContext(DarkThemeContext);

  const handlePomodoroVisibilityChange = (event) => {
    setOptions({
      ...options,
      graph: {
        ...options.graph,
        linesEnabled: {
          ...options.graph.linesEnabled,
          pomodoros: event.target.checked,
        },
      },
    });
  };

  const handleOutreachVisibilityChange = (event) => {
    setOptions({
      ...options,
      graph: {
        ...options.graph,
        linesEnabled: {
          ...options.graph.linesEnabled,
          outreach: event.target.checked,
        },
      },
    });
  };

  const handleApplicationsVisibilityChange = (event) => {
    setOptions({
      ...options,
      graph: {
        ...options.graph,
        linesEnabled: {
          ...options.graph.linesEnabled,
          applications: event.target.checked,
        },
      },
    });
  };

  const getNewPeriod = () => {
    const index = graphPeriodOptions.findIndex(
      (el) => el === options.graph.period
    );
    return graphPeriodOptions[
      (index + periodOffset) % graphPeriodOptions.length
    ];
  };

  const changeMonthOfGraph = (difference) => {
    const today = getTodaysDateAsObj().date;
    const { newMonth, newYear } = addSubtractMonths(date, difference);
    let newDay = 1;
    if (newMonth === today.month && newYear === today.year) newDay = today.day;
    setDate({ day: newDay, month: newMonth, year: newYear });
  };

  const lineColors = {
    pomodoros: "#333",
    outreach: "#b55c4e",
    applications: "#4e7cb5",
  };

  return (
    <div className={"canvas-container"} style={props.style}>
      {/* Switch Graph View Button */}
      {/* {entriesData.length > 0 && (
            <div
                className={"switch-graph-view-btn"}
                style={getSystemButtonStyle(darkTheme)}
                onClick={() =>
                    setPeriodOffset((periodOffset + 1) % graphPeriodOptions.length)
                }
            >
                {convertTextToTitleCase(getNewPeriod())}
            </div>
        )} */}
      {getNewPeriod() === "month" ? (
        <div className={"switch-month-btn-container"}>
          <button
            className={"switch-month-btn"}
            style={{ ...getSystemButtonStyle(darkTheme), padding: "0.5rem" }}
            onClick={() => changeMonthOfGraph(-1)}
          >{`⬅   ${monthStringArray[(date.month - 2 + 12) % 12]}`}</button>
          <button
            className={"switch-month-btn"}
            style={{ ...getSystemButtonStyle(darkTheme), padding: "0.5rem" }}
            onClick={() => changeMonthOfGraph(1)}
          >{`${monthStringArray[(date.month + 12) % 12]}   ➡`}</button>
        </div>
      ) : null}
      <div className={"switch-graph-data-input-container"}>
        <label
          className="switch-graph-data-label"
          style={{ color: lineColors.pomodoros }}
        >
          <input
            className="switch-graph-data-input"
            type="checkbox"
            checked={options.graph.linesEnabled.pomodoros}
            onChange={handlePomodoroVisibilityChange}
          />
          Pomodoros
        </label>
        <label
          className="switch-graph-data-label"
          style={{ color: lineColors.outreach }}
        >
          <input
            className="switch-graph-data-input"
            type="checkbox"
            checked={options.graph.linesEnabled.outreach}
            onChange={handleOutreachVisibilityChange}
          />
          Outreach
        </label>
        <label
          className="switch-graph-data-label"
          style={{ color: lineColors.applications }}
        >
          <input
            className="switch-graph-data-input"
            type="checkbox"
            checked={options.graph.linesEnabled.applications}
            onChange={handleApplicationsVisibilityChange}
          />
          Applications
        </label>
      </div>
      <GraphCanvas
        {...{
          entriesData,
          outreachData,
          applicationsData,
          date,
          options,
          lineColors,
        }}
        period={getNewPeriod()}
      />
    </div>
  );
}

export default Graph;
