import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getSettingsBoxStyle } from 'styles/settings';
import { reauthenticate } from 'data/queries';
import ThemeContext from 'context/theme';
import Form from 'components/Form';

const PasswordInput = (props) => {
	const { message, onConfirm } = props;
	const darkTheme = useContext(ThemeContext);
	const history = useHistory();

	const onPasswordSubmit = async (e) => {
		e.preventDefault();
		const { password } = e.target.elements;
		if (password.value) {
			const authenticated = await reauthenticate(password.value);
			return onConfirm(authenticated);
		} else return onConfirm(false);
	};

	return (
		<div className="screenContainer" style={getAppContainerStyle(darkTheme)}>
			<div className="settingsBox" style={getSettingsBoxStyle(darkTheme)}>
				<h2 className="header">{message}</h2>
				<Form
					inputs={[ 'password' ]}
					submitText={'Confirm Password'}
					onSubmit={onPasswordSubmit}
					onCancel={() => history.push('/settings')}
				/>
			</div>
		</div>
	);
};

export default PasswordInput;
