export const getPageWidth = () => {
  return (
    window.innerWidth /
    parseFloat(getComputedStyle(document.querySelector("body"))["font-size"])
  );
};

export const getAutoHourWidth = (options) => {
  const hourRange = options.endTime - options.startTime;
  return getPageWidth() / hourRange - 0.55;
};
