import React from "react";
import Dropdown from "components/Dropdown";
import {
  convert24hrTo12hrTime,
  convert12hrTo24hrTime,
  getArrayTimes,
} from "utility/parseTime";

function TimeOptionSelect(props) {
  const { options, setOptions } = props;
  return (
    <div className={"time-option"}>
      <div>
        <span className={"time-option-label time-option-element"}>
          Start Hour:
        </span>
        <Dropdown
          className={"time-option-drop-down time-start-hour"}
          default={
            options.timeline.twelveHourClock
              ? convert24hrTo12hrTime(options.timeline.startTime)
              : options.timeline.startTime
          }
          onClick={(el) => {
            setOptions({
              ...options,
              timeline: {
                ...options.timeline,
                startTime: options.timeline.twelveHourClock
                  ? convert12hrTo24hrTime(el)
                  : el,
              },
            });
          }}
          options={getArrayTimes(options.timeline.twelveHourClock, 0).slice(0, options.timeline.endTime)}
          style={{ zIndex: "2" }}
        />
      </div>
      <div>
        <span className={"time-option-label time-option-element"}>
          End Hour:
        </span>
        <Dropdown
          className={"time-option-drop-down time-end-hour"}
          default={
            options.timeline.twelveHourClock
              ? convert24hrTo12hrTime(options.timeline.endTime)
              : options.timeline.endTime
          }
          onClick={(el) => {
            const endTime = options.timeline.twelveHourClock
              ? convert12hrTo24hrTime(el)
              : el;
            setOptions({
              ...options,
              timeline: {
                ...options.timeline,
                endTime: endTime === 0 ? 24 : endTime,
              },
            });
          }}
          options={getArrayTimes(options.timeline.twelveHourClock, 1).slice(options.timeline.startTime)}
          style={{ zIndex: "1" }}
        />
      </div>
    </div>
  );
}
export default TimeOptionSelect;
