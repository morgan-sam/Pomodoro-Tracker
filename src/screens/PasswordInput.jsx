import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAppContainerStyle } from 'styles/app';
import { getContentBoxStyle } from 'styles/settings';
import { reauthenticate } from 'data/queries';
import DarkThemeContext from 'context/theme';
import Form from 'components/Form';

const PasswordInput = (props) => {
	const { message, onConfirm } = props;
	const darkTheme = useContext(DarkThemeContext);
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
		<div className="screen-container" style={getAppContainerStyle(darkTheme)}>
			<div className="content-box" style={getContentBoxStyle(darkTheme)}>
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
