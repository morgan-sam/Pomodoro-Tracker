import React from "react";
import Dropdown from "components/Dropdown";
import {
  convert24hrTo12hrTime,
  convert12hrTo24hrTime,
  getArrayTimes,
} from "utility/parseTime";

function TimeOptionSelect(props) {
  return (
    <div className={"time-option"}>
      <div>
        <span className={"time-option-label time-option-element"}>
          Start Hour:
        </span>
        <Dropdown
          className={"time-option-drop-down"}
          default={
            props.options.timeline.twelveHourClock
              ? convert24hrTo12hrTime(props.options.timeline.startTime)
              : props.options.timeline.startTime
          }
          onClick={(el) => {
            props.setOptions({
              ...props.options,
              timeline: {
                ...props.options.timeline,
                startTime: props.options.timeline.twelveHourClock
                  ? convert12hrTo24hrTime(el)
                  : el,
              },
            });
          }}
          options={getArrayTimes(
            props.options.timeline.twelveHourClock,
            0
          ).slice(0, props.options.timeline.endTime)}
          style={{ zIndex: "2" }}
        />
      </div>
      <div>
        <span className={"time-option-label time-option-element"}>
          End Hour:
        </span>
        <Dropdown
          className={"time-option-drop-down"}
          default={
            props.options.timeline.twelveHourClock
              ? convert24hrTo12hrTime(props.options.timeline.endTime)
              : props.options.timeline.endTime
          }
          onClick={(el) => {
            const endTime = props.options.timeline.twelveHourClock
              ? convert12hrTo24hrTime(el)
              : el;
            props.setOptions({
              ...props.options,
              timeline: {
                ...props.options.timeline,
                endTime: endTime === 0 ? 24 : endTime,
              },
            });
          }}
          options={getArrayTimes(
            props.options.timeline.twelveHourClock,
            1
          ).slice(props.options.timeline.startTime)}
          style={{ zIndex: "1" }}
        />
      </div>
    </div>
  );
}
export default TimeOptionSelect;
