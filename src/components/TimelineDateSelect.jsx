import React from 'react';
import DateNavigation from 'components/DateNavigation';

function TimelineDateSelect(props) {
	return (
		<div style={{ ...props.style }}>
			<DateNavigation date={props.date} setDate={props.setDate} />
		</div>
	);
}
export default TimelineDateSelect;
