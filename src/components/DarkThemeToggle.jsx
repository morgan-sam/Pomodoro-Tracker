import React from 'react';
import Checkbox from 'components/Checkbox';

function DarkThemeToggle(props) {
	const { displayOptions, setDisplayOptions } = props;

	const containerStyle = {
		display: 'flex',
		margin: '2rem 0'
	};

	const commonMargin = {
		margin: '1rem 0'
	};

	return (
		<div style={containerStyle}>
			<div style={commonMargin}>Dark Theme:</div>
			<Checkbox
				style={{ ...commonMargin, borderRadius: '100%', margin: '1rem' }}
				default={displayOptions.darkTheme}
				displayOptions={displayOptions}
				onChange={() => {
					setDisplayOptions({
						...displayOptions,
						darkTheme: !displayOptions.darkTheme
					});
				}}
			/>
		</div>
	);
}
export default DarkThemeToggle;
