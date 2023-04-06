export const getTimelineWidthRems = () => {
  let width = 0;
  if (document.querySelector('.elements-timeline')) width = document.querySelector('.elements-timeline').offsetWidth;
  return (
    width /
    parseFloat(getComputedStyle(document.querySelector("body"))["font-size"])
  );
};

export const getAutoHourWidth = (options) => {
  const hourRange = options.endTime - options.startTime;
  return getTimelineWidthRems() / hourRange;
};
