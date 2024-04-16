import React from "react";

function HabitTracking(props) {
  return (
    <div className={"habit-tracking"}>
      <div className={"habit-tracking-container"}>
        <div className={"habit-tracking-item"}>
          <h3>Posted</h3>
          <input type="checkbox" />
        </div>
        {/* <div className={"habit-tracking-item"}>
          <h3>Read</h3>
          <input type="checkbox" />
        </div>
        <div className={"habit-tracking-item"}>
          <h3>Write</h3>
          <input type="checkbox" />
        </div>
        <div className={"habit-tracking-item"}>
          <h3>Study</h3>
          <input type="checkbox" />
        </div> */}
      </div>
    </div>
  );
}

export default HabitTracking;
