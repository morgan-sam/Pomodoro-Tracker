export const defaultOptions = {
  timeline: {
    start: false,
    encore: true,
    startTime: 8,
    endTime: 24,
    twelveHourClock: true,
  },
  graph: {
    visible: true,
    period: "week passed",
    type: "both",
    maxPomodoro: 14,
    linesEnabled: {
      pomodoros: true,
      outreach: true
    }
  },
  darkTheme: false,
  colorTheme: { hue: 250, saturation: 50, lightness: 50 },
};

export const graphPeriodOptions = ["week ahead", "week passed", "month"];
