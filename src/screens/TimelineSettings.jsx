import React from 'react';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';
import { useState } from 'react';
import Checkbox from 'components/Checkbox';

const TimelineSettings = (props) => {
	const { options, setOptions } = props;
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);

	const [ tempOptions, setTempOptions ] = useState(options);

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridTemplateRows: 'repeat(5, 1fr)',
		gridColumnGap: '0px',
		gridRowGap: '0px',
		alignItems: 'center',
		justifyContent: 'center'
	};

	const timelineSelects = [ 'encore', 'start', 'grid', 'twelveHourClock' ];

	const checkWithLabelArray = () =>
		timelineSelects.map((el) => {
			console.log(tempOptions.timeline[el]);
			return [
				<div>{el}:</div>,
				<Checkbox
					style={{ borderRadius: '100%', margin: '1rem' }}
					default={tempOptions.timeline[el]}
					options={tempOptions}
					onChange={() => {
						setTempOptions({
							...tempOptions,
							timeline: {
								...tempOptions.timeline,
								[el]: !tempOptions.timeline[el]
							}
						});
					}}
				/>
			];
		});

	return (
		<div className="screenContainer">
			<div className="settingsBox">
				<h2 className="header">Timeline Settings</h2>
				<div className="button-column">
					{/* <TimeOptionSelect options={props.options} setOptions={props.setOptions} /> */}
					<div>Timeline:</div>

					<div style={gridStyle}>{checkWithLabelArray()}</div>
				</div>
				<div className="footer">
					<button style={accountButtonStyle} onClick={() => history.push('/settings')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimelineSettings;
