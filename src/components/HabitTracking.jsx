import React, { useContext } from "react";
import { DataContext } from "context/data";
import { updateHabitsData } from "data/queries";
import { twoLeadingZeroes } from "utility/parseText";

function HabitTracking(props) {
  const data = useContext(DataContext);
  const habitsData = data.habitsData;
  const date = data.date;

  const todayDateString = `${date["year"]}-${twoLeadingZeroes(
    date["month"]
  )}-${twoLeadingZeroes(date["day"])}`;

  const habitToggle = (habit) => {
    const newHabitsData = { ...habitsData };
    if (
      habitsData &&
      habitsData[todayDateString] &&
      habitsData[todayDateString][habit]
    ) {
      newHabitsData[todayDateString] = {
        ...newHabitsData[todayDateString],
        [habit]: !newHabitsData[todayDateString][habit],
      };
      updateHabitsData(newHabitsData);
    } else {
      newHabitsData[todayDateString] = {
        ...newHabitsData[todayDateString],
        [habit]: true,
      };
      updateHabitsData(newHabitsData);
    }
  };

  return (
    <div className={"habit-tracking"}>
      <div className={"habit-tracking-container"}>
        <div className={"habit-tracking-item"}>
          <h3>Posted</h3>
          <input
            type="checkbox"
            onChange={() => habitToggle("posted")}
            checked={
              // if habitsData[todayDateString]["posted"] exists use value habitsData[todayDateString]["posted"] for checked, else uncheck:
              habitsData &&
              habitsData[todayDateString] &&
              habitsData[todayDateString]["posted"]
            }
          />
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
