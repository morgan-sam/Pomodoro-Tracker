import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSettingsBoxStyle } from 'styles/settings';
import ThemeContext from 'context/theme';
import Form from 'components/Form';

const Input = (props) => {
	const { message, onSubmit } = props;
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();

	return (
		<div className="screenContainer" style={getAppContainerStyle(darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(darkTheme)}>
				<h2 className="header">{message}</h2>
				<Form
					inputs={[ 'password' ]}
					submitText={'Confirm Password'}
					onSubmit={onSubmit}
					onCancel={() => history.push('/settings')}
				/>
			</div>
		</div>
	);
};

export default Input;
