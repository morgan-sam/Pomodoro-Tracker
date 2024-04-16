import React, { useState, useEffect } from "react";
import TopPanel from "components/TopPanel";
import BottomPanel from "components/BottomPanel";
import { getAutoHourWidth } from "utility/calculateSizing";
import { compareObjs } from "utility/sortAndCompare";
import { convertUTCISOToDateObj } from "utility/parseDates";
import { getAppContainerStyle } from "styles/app";
import { getAllData, getEntries, postOptions, getOptions } from "data/queries";

function Main(props) {
  const { options, setOptions, fadeIn, setFadeIn } = props;

  // State

  const [loaded, setLoaded] = useState(false);
  const [entriesData, setEntriesData] = useState([]);
  const [outreachData, setOutreachData] = useState({});
  const [applicationsData, setApplicationsData] = useState({});
  const [moneyData, setMoneyData] = useState({});
  const [date, setDate] = useState(
    convertUTCISOToDateObj(new Date().toISOString()).date
  );
  const [hourWidth, setHourWidth] = useState(
    getAutoHourWidth(options.timeline)
  );

  const filterEntries = (entries) =>
    entries.filter((el) => compareObjs(el.date, date));

  function formatEntriesToUseDateObj(data) {
    return data.map((el) => {
      const { date, time } = convertUTCISOToDateObj(el.date);
      return {
        id: el._id,
        type: el.type,
        date,
        time,
      };
    });
  }

  async function updateAllData() {
    try {
      const data = await getAllData();
      const { events, outreach_data, applications_data, money_data } = data;
      const formatted_events = formatEntriesToUseDateObj(Object.values(events));
      setEntriesData(formatted_events);
      if (outreach_data) setOutreachData(outreach_data);
      if (applications_data) setApplicationsData(applications_data);
      setMoneyData(money_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateAllEntries() {
    try {
      const entries = await getEntries();
      const formatted_events = formatEntriesToUseDateObj(
        Object.values(entries)
      );
      setEntriesData(formatted_events);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateAllData();
    // setInterval(function() {
    //   updateAllEntries();
    // }, 60000);
  }, []);

  useEffect(() => {
    const getOptionsFromDatabase = async () => {
      const databaseOptions = await getOptions();
      if (databaseOptions) setOptions(databaseOptions);
    };
    getOptionsFromDatabase();
    setTimelineToFitWindow();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setTimelineToFitWindow);
    return () => {
      window.removeEventListener("resize", setTimelineToFitWindow);
    };
  });

  useEffect(() => {
    const setDatabaseOptions = async () => {
      const databaseOptions = await getOptions();
      if (JSON.stringify(options) !== JSON.stringify(databaseOptions))
        postOptions(options);
    };
    setDatabaseOptions();
  }, [options]);

  const setTimelineToFitWindow = () =>
    setHourWidth(getAutoHourWidth(options.timeline));

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeIn(false), 1000);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div
      className={`app ${fadeIn ? "fade-in" : ""}`}
      style={getAppContainerStyle(options.darkTheme)}
    >
      <div className={"main-container"}>
        <TopPanel
          filteredEntries={filterEntries(entriesData)}
          eventLengths={{
            pomodoro: 25,
            encore: 5,
          }}
          {...{
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
          }}
        />
        {options.graph.visible && (
          <BottomPanel
            {...{
              entriesData,
              outreachData,
              applicationsData,
              date,
              setDate,
              options,
              setOptions,
              moneyData,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
