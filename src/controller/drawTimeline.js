import { convert24hrTo12hrTime } from "utility/parseTime";

export const drawTimeline = (options, entries) => {
  const { context } = options;
  console.log(options);
  context.translate(0.5, 0.5);
  drawTimelineGrid(options);
  addEntries(options, entries);
  drawTimelineOutline(options);
  context.translate(-0.5, -0.5);
};

const addEntries = (options, entries) => {
  const { hourWidth, startTime, pomodoroWidth, encoreWidth } = options;
  entries.forEach((el) => {
    const time = el.time.hour + el.time.minute / 60;
    if (el.type === "pomodoro") {
      const pos = (time - startTime) * hourWidth - pomodoroWidth;
      drawPomodoro(options, pos);
    }
    if (el.type === "encore") {
      const pos = (time - startTime) * hourWidth - encoreWidth;
      drawEncore(options, pos);
    }
  });
};

const drawPomodoro = (options, pos) => {
  const { context, color, eventOffsetY, timelineHeight, pomodoroWidth } =
    options;
  context.beginPath();
  context.fillStyle = color.pomodoro;
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.rect(pos, eventOffsetY, pomodoroWidth, timelineHeight - eventOffsetY);
  context.fill();
  context.stroke();
};

const drawEncore = (options, pos) => {
  const { context, color, eventOffsetY, timelineHeight, encoreWidth } = options;
  context.beginPath();
  context.fillStyle = color.encore;
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.rect(pos, eventOffsetY, encoreWidth, timelineHeight - eventOffsetY);
  context.fill();
  context.stroke();
};

export const clearTimeline = (options) => {
  const { context, timeRange, hourWidth, timelineHeight } = options;
  context.fillStyle = "white";
  context.fillRect(0, 0, timeRange * hourWidth, timelineHeight);
};

const drawTimelineGrid = (options) => {
  const { timeRange } = options;
  Array.from(Array(timeRange).keys()).map((i) => drawTimeBox(i, options));
};

const drawTimeBox = (index, options) => {
  const { context, hourWidth, timelineHeight, startTime } = options;
  context.beginPath();
  context.fillStyle = "black";
  const time = (index + startTime) % 24;
  context.rect(hourWidth * index, 0, hourWidth, timelineHeight);
  context.font = "15px Roboto";
  context.fillText(`${convert24hrTo12hrTime(time)}`, 5 + hourWidth * index, 20);
  context.stroke();
};

const drawTimelineOutline = (options) => {
  const { context, hourWidth, timeRange, timelineHeight } = options;
  context.beginPath();
  context.rect(0, 0, hourWidth * timeRange - 1, timelineHeight - 1);
  context.stroke();
};
