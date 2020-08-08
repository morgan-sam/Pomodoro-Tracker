import React, { useContext, useRef, useEffect } from 'react';
import { DarkThemeContext, ColorThemeContext } from 'context/theme';
import { drawTimeline, clearTimeline } from 'controller/drawTimeline';
import { remToPx } from 'utility/convertUnit';

function DayTimeline(props) {
	const { options, entries } = props;
	const canvasRef = useRef(null);
	const darkTheme = useContext(DarkThemeContext);
	const colorTheme = useContext(ColorThemeContext);

	const timeRange = options.timeline.endTime - options.timeline.startTime;
	const hourWidth = remToPx(props.hourWidth);
	const timelineHeight = 130;
	const pomodoroWidth = 5 * hourWidth / 12;
	const encoreWidth = hourWidth / 12;

	useEffect(
		() => {
			if (canvasRef.current) {
				const timelineOptions = {
					timeRange,
					hourWidth,
					pomodoroWidth,
					encoreWidth,
					timelineHeight,
					eventOffsetY: 40,
					color: {
						pomodoro: colorTheme.light,
						encore: colorTheme.dark
					},
					startTime: options.timeline.startTime,
					context: canvasRef.current.getContext('2d')
				};
				clearTimeline(timelineOptions);
				drawTimeline(timelineOptions, entries);
			}
		},
		[ entries ]
	);

	return <canvas ref={canvasRef} className={'daytimeline'} width={timeRange * hourWidth} height={timelineHeight} />;
}

export default DayTimeline;
