import React from 'react';
import bash from 'img/bash.svg';
import python from 'img/python.svg';
import FileIcon from 'components/FileIcon';
import { useHistory } from 'react-router-dom';
import bashScript from 'scripts/pomodoro.sh';
import pythonScript from 'scripts/pomodoro.py';
import firebase from 'firebase/app';
import { reauthenticate } from 'data/queries';
import { getAppContainerStyle } from 'styles/app';
import { getSystemButtonStyle, getContentBoxStyle } from 'styles/settings';

const downloadFile = (filename, text) => {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

const getScriptString = async (file, password) => {
	const response = await fetch(file);
	let script = await response.text();
	script = script.replace('[EMAIL]', firebase.auth().currentUser.email);
	script = script.replace('[PASSWORD]', password);
	return script;
};

const downloadPomodoroScript = async (file, extension) => {
	const password = prompt(
		'Please enter your password:\n(WARNING: ENCRYPTION IS NOT YET IMPLEMENTED, YOUR PASSWORD WILL BE STORED AS PLAIN TEXT IN THE SCRIPT. PLEASE CANCEL IF THIS IS AN ISSUE.)'
	);
	const passCorrect = await reauthenticate(password);
	if (passCorrect) {
		const script = await getScriptString(file, password);
		downloadFile('pomodoro.' + extension, script);
	} else {
		alert('Incorrect Password');
	}
};

const Script = (props) => {
	const { options } = props;
	const history = useHistory();
	return (
		<div className="screen-container" style={getAppContainerStyle(options.darkTheme)}>
			<div className="content-box" style={getContentBoxStyle(options.darkTheme)}>
				<h2 className="header">Download Script</h2>
				<div className="icon-container">
					<FileIcon
						onClick={() => downloadPomodoroScript(bashScript, 'sh')}
						style={{ cursor: 'pointer' }}
						icon={bash}
						text={'pomodoro.sh'}
					/>
					<FileIcon
						onClick={() => downloadPomodoroScript(pythonScript, 'py')}
						style={{ cursor: 'pointer' }}
						icon={python}
						text={'pomodoro.py'}
					/>
				</div>
				<div className="footer">
					<button style={getSystemButtonStyle(false)} onClick={() => history.push('/')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default Script;
