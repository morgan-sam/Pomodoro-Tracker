export const defaultOptions = {
	timeline: {
		start: false,
		encore: true,
		startTime: 8,
		endTime: 24,
		twelveHourClock: true
	},
	graph: {
		visible: true,
		period: 'week passed',
		type: 'both',
		maxPomodoro: 14
	},
	darkTheme: false,
	colorTheme: { hue: 126, saturation: 1, lightness: 1 }
};

export const graphPeriodOptions = [ 'week ahead', 'week passed', 'month' ];
