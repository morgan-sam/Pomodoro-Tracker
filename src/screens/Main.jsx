import React, { useState, useEffect } from "react";
import TopPanel from "components/TopPanel";
import TopRightButtons from "components/TopRightButtons";
import GraphPanel from "components/GraphPanel";
import { getAutoHourWidth } from "utility/calculateSizing";
import { compareObjs } from "utility/sortAndCompare";
import { convertUTCISOToUKObj } from "utility/parseDates";
import { getAppContainerStyle } from "styles/app";
import { getEntries, postOptions, getOptions } from "data/queries";

function Main(props) {
  const { options, setOptions, fadeIn, setFadeIn } = props;
  const [entriesData, setEntriesData] = useState([]);
  const [date, setDate] = useState(
    convertUTCISOToUKObj(new Date().toISOString()).date
  );
  const [hourWidth, setHourWidth] = useState(
    getAutoHourWidth(options.timeline)
  );

  function filterEntries(entries) {
    return entries.filter((el) => {
      if (compareObjs(el.date, date)) return true;
      else return false;
    });
  }

  function convertDataToUKTimezone(data) {
    return data.map((el) => {
      const { date, time } = convertUTCISOToUKObj(el.date);
      return {
        id: el._id,
        type: el.type,
        date,
        time,
      };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const entries = await getEntries();
        const correctedTimezoneData = convertDataToUKTimezone(entries);
        setEntriesData(correctedTimezoneData);
      } catch (error) {
        console.log(error);
      }
    })();
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

  const setTimelineToFitWindow = () => {
    setHourWidth(getAutoHourWidth(options.timeline));
  };

  const optionProps = {
    date,
    setDate,
    options,
    setOptions,
  };

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
          hourWidth={hourWidth}
          eventLengths={{
            pomodoro: 25,
            encore: 5,
          }}
          {...optionProps}
        />
        <TopRightButtons />
        {options.graph.visible && (
          <GraphPanel
            {...{
              entriesData,
              date,
              setDate,
              options,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
