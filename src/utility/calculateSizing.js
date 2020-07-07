export const getPageWidth = () => {
	return window.innerWidth / parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
};

export const getAutoHourWidth = (timeOptions) => {
	const hourRange = timeOptions.endTime - timeOptions.startTime;
	return getPageWidth() / hourRange - 0.5;
};
