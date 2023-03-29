import React, { useState, useEffect } from "react";
import TopPanel from "components/TopPanel";
import TopRightButtons from "components/TopRightButtons";
import BottomPanel from "components/BottomPanel";
import { getAutoHourWidth } from "utility/calculateSizing";
import { compareObjs } from "utility/sortAndCompare";
import { convertUTCISOToDateObj } from "utility/parseDates";
import { getAppContainerStyle } from "styles/app";
import { getEntries, postOptions, getOptions, getOutreachData, postOutreachData} from "data/queries";

function Main(props) {
  const { options, setOptions, fadeIn, setFadeIn } = props;

  // State
  
  const [loaded, setLoaded] = useState(false);
  const [entriesData, setEntriesData] = useState([]);
  const [outreachData, setOutreachData] = useState({});
  const [date, setDate] = useState(convertUTCISOToDateObj(new Date().toISOString()).date);
  const [hourWidth, setHourWidth] = useState(getAutoHourWidth(options.timeline));

  const filterEntries = (entries) => entries.filter((el) => compareObjs(el.date, date));

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

  // useEffects

  useEffect(() => {
    (async () => {
      try {
        const entries = await getEntries();
        const formattedEntries = formatEntriesToUseDateObj(entries);
        setEntriesData(formattedEntries);
        const emailCount = await getOutreachData();
        setOutreachData(emailCount);
        setLoaded(true);
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
    if (loaded) postOutreachData(outreachData);
  }, [outreachData]);

  useEffect(() => {
    const setDatabaseOptions = async () => {
      const databaseOptions = await getOptions();
      if (JSON.stringify(options) !== JSON.stringify(databaseOptions))
        postOptions(options);
    };
    setDatabaseOptions();
  }, [options]);

  const setTimelineToFitWindow = () => setHourWidth(getAutoHourWidth(options.timeline));

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
          outreachData={outreachData}
          setOutreachData={setOutreachData}
          filteredEntries={filterEntries(entriesData)}
          hourWidth={hourWidth}
          eventLengths={{
            pomodoro: 25,
            encore: 5,
          }}
          {...{ date, setDate, options, setOptions }}
        />
        <TopRightButtons />
        {options.graph.visible && (
          <BottomPanel
            {...{
              entriesData,
              outreachData,
              date,
              setDate,
              options,
              setOptions
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;
