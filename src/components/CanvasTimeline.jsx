import React, { useContext, useRef, useEffect } from 'react';
import { DarkThemeContext, ColorThemeContext } from 'context/theme';
import { drawTimeline, clearTimeline } from 'controller/drawTimeline';

function CanvasTimeline(props) {
	const { options, entries } = props;
	const canvasRef = useRef(null);
	const colorTheme = useContext(ColorThemeContext);

	const timeRange = options.timeline.endTime - options.timeline.startTime;
	const hourWidth = 100;
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

	return (
		<div className="canvas-timeline-parent">
			<div className="canvas-timeline-container">
				<canvas
					ref={canvasRef}
					className={'canvas-timeline'}
					width={timeRange * hourWidth}
					height={timelineHeight}
				/>
			</div>{' '}
		</div>
	);
}

export default CanvasTimeline;
