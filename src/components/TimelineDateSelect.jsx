import React from 'react';
import DateNavigation from 'components/DateNavigation';

function TimelineDateSelect(props) {
	return (
		<div style={{ ...props.style }}>
			<DateNavigation filterOptions={props.filterOptions} setFilterOptions={props.setFilterOptions} />
		</div>
	);
}
export default TimelineDateSelect;
